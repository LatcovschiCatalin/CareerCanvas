from flask import request, jsonify
import mysql.connector
from datetime import datetime
import math

def create_job_(mycursor, db, request, user_id):
    job_title = request.form.get('job_title')
    job_description = request.form.get('job_description')
    location = request.form.get('location')
    salary = request.form.get('salary')
    application_deadline = request.form.get('application_deadline')
    job_email = request.form.get('job_email')
    job_phone = request.form.get('job_phone')

    # Insert the job data into the database
    sql = """
                INSERT INTO jobs (job_title, job_description, location, salary, application_deadline, job_email, job_phone, user_id, created)
                VALUES (%s, %s, %s, %s, STR_TO_DATE(%s, '%d-%m-%Y'), %s, %s, %s, %s)
            """
    values = (job_title, job_description, location, salary, application_deadline, job_email, job_phone, user_id, datetime.now())
    mycursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "Job created successfully"}), 201


def get_all_jobs(mycursor, request):
    criteria = request.args.get('criteria', default='created', type=str)
    order = request.args.get('order', default="ASC", type=str)
    page_num = request.args.get('page_num', default=1, type=int)
    records_per_page = 10
    list_of_available_criterias = ["job_title", "application_deadline", "created"]

    if order.upper() != "DESC" and order.upper() != "ASC":
        return jsonify({"error":"Invalid order use DESC/ASC"})

    mycursor.execute("SELECT COUNT(*) FROM user")
    total_records = mycursor.fetchone()[0]
    mycursor.fetchall()

    total_pages = math.ceil(total_records/records_per_page)
    if(total_pages<page_num):
        return jsonify({"error":"Invalid page number"})
    
    if criteria not in list_of_available_criterias:
        return jsonify({"error": "Invalid Criteria"})
    
    mycursor.execute(f"SELECT job_id, created, job_title, application_deadline, job_description, salary, location FROM jobs ORDER BY {criteria} {order} LIMIT {records_per_page} OFFSET %s", ((page_num-1)*10,))
    column_names = [desc[0] for desc in mycursor.description]
    result = [dict(zip(column_names, row)) for row in mycursor.fetchall()]
    return jsonify({
        "data": result,
        "total_pages": total_pages,
        "current_page": page_num
    })

def get_job_by_id(mycursor, request, handle_bad_request):
    job_id = request.args.get('job_id', default=1, type=int)
    mycursor.execute("SELECT * FROM jobs WHERE job_id = %s", (job_id,))
    job = mycursor.fetchone()
    if job:
        mycursor.execute(f"SELECT first_name, last_name, email, phone FROM user WHERE user_id={job[8]}")
        user = mycursor.fetchone()
        user_dict = {
            "first_name": user[0],
            "last_name": user[1],
            "email": user[2],
            "phone": user[3],
        }
        job_dict = {
            "id": job[0],
            "title": job[1],
            "description": job[2],
            "location": job[3],
            "salary": job[4],
            "application_deadline": job[5],
            "job_email": job[6],
            "job_phone": job[7],
            "author": user_dict
        }
        return jsonify(job_dict)
    else:
        return handle_bad_request("Job not found")


def update_job_by_id(mycursor, db, request, user_id):
        # Update the job data in the database
        job_id = request.args.get('job_id', default=1, type=int)
        # Check if user owns this job
        mycursor.execute(f"SELECT user_id FROM jobs WHERE job_id={job_id}")
        result = mycursor.fetchone()
        if result and result[0] == user_id:
            sql = """
            UPDATE jobs
            SET job_title = %s, job_description = %s, location = %s, salary = %s,
                application_deadline = STR_TO_DATE(%s, '%d-%m-%Y'), job_email = %s, job_phone = %s
            WHERE job_id = %s and user_id=%s
            """
            values = forms_request() + (job_id,user_id)
            mycursor.execute(sql, values)
            db.commit()

            return jsonify({"message": "Job updated successfully"})
        else:
            return jsonify({"error": "User doesn't own this job"})

def delete_job_by_id(mycursor, db, request, user_id):
    job_id = request.args.get('job_id', default=1, type=int)
    # Check if user owns this job
    mycursor.execute(f"SELECT user_id FROM jobs WHERE job_id={job_id}")
    result = mycursor.fetchone()
    if result and result[0] == user_id:
        mycursor.execute("DELETE FROM jobs WHERE job_id = %s", (job_id,))
        db.commit()
        return jsonify({"message": "Job deleted successfully"})
    else:
        return jsonify({"error": "User doesn't own this job"})


def get_all_available_tags(mycursor):
    mycursor.execute("SELECT tag_id, tag_name FROM jobrapid.tags")
    tags = mycursor.fetchall()
    # Returns as a tuple, use the tag_name for the frontend and return the tag_id to the backend
    return tags

# Adding tags to a job
def add_tags_to_job(mycursor, db, request):
    job_id = request.form.get('job_id')
    tag_ids = request.form.get("tag_id")
    mycursor.execute(f"SELECT COUNT(*) FROM jobrapid.jobs_tags WHERE job_id = {job_id}")
    count = mycursor.fetchone()[0]
    if not(count > 0):
        if tag_ids:
            try:
                # example of tag_ids to provide - 1,3,5,6
                tag_id_list = [int(tag_id) for tag_id in tag_ids.split(",")]
                for tag_id in tag_id_list:
                    sql = "INSERT INTO jobs_tags (job_id, tag_id) VALUES (%s, %s)"
                    values = (job_id, tag_id)
                    mycursor.execute(sql, values)
                    db.commit()
                return jsonify({"message": f"Tags added successfully for job_id = {job_id}"})
            except ValueError as e:
                return jsonify({"error": f"Invalid tag_id: {e}"})
        else:
            return jsonify({"error": "No tags provided"})
    else:
        return jsonify({"error": "Tags already added to this job. Please use update instead."})


# Getting all the tags related to a job id
def get_tags_for_job(mycursor, job_id):
    mycursor.execute(f"SELECT t.tag_name FROM tags AS t INNER JOIN jobs_tags AS J ON t.tag_id = j.tag_id WHERE job_id = {job_id}")
    result = mycursor.fetchall()
    tag_names = [tag[0] for tag in result]
    if tag_names:
        return tag_names
    else:
        return jsonify({"error": "No tags found for this job"})


# Remove tags from job
def delete_tags_from_job(mycursor, request, db):
    job_id = request.form.get('job_id')
    tag_ids = request.form.get("tag_id")
    if tag_ids:
        try:
            tag_id_list = [int(tag_id) for tag_id in tag_ids.split(",")]
            for tag in tag_id_list:
                mycursor.execute(f"DELETE FROM jobrapid.jobs_tags WHERE job_id = {job_id} AND tag_id = {tag}")
                db.commit()
            return jsonify({"message": "Tags successfully deleted"})
        except ValueError as e:
            return jsonify({"error": f"Invalid tag_id: {e}"})
    else:
        return jsonify({"error": "No tags given"})

# Update tags for a job. NOTE: Ensure from the frontend that the user can't pick tags that he's already picked
# i.e., give the backend only values that are VALID and NOT in the database already (for adding) and in the database
# for deleting a tag
def update_tags_for_job(mycursor, request, db):
    job_id = request.form.get('job_id')
    tag_id_add = request.form.get("tag_id_add")
    tag_id_remove = request.form.get("tag_id_remove")
    mycursor.execute(f"SELECT COUNT(*) FROM jobrapid.jobs_tags WHERE job_id = {job_id}")
    count = mycursor.fetchone()[0]
    if count > 0:
        if tag_id_add or tag_id_remove:
            try:
                # example of tag_ids to provide - 1,3,5,6
                tag_id_list = [int(tag_id) for tag_id in tag_id_add.split(",")]
                for tag_id in tag_id_list:
                    sql = "INSERT INTO jobs_tags (job_id, tag_id) VALUES (%s, %s)"
                    values = (job_id, tag_id)
                    mycursor.execute(sql, values)
                    db.commit()
            except ValueError as e:
                return jsonify({"error": f"Invalid tag_id: {e}"})

            try:
                tag_id_list = [int(tag_id) for tag_id in tag_id_remove.split(",")]
                for tag in tag_id_list:
                    mycursor.execute(f"DELETE FROM jobrapid.jobs_tags WHERE job_id = {job_id} AND tag_id = {tag}")
                    db.commit()
            except ValueError as e:
                return jsonify({"error": f"Invalid tag_id: {e}"})

            return jsonify({"message": "Job tags successfully updated."})
        else:
            return jsonify({"error": "No tags given"})
    else:
        return jsonify({"error": "No job tags available for the job. Please use ADD instead."})


def forms_request():
    title = request.form.get("job_title")
    description = request.form.get("job_description")
    location = request.form.get("location")
    salary = request.form.get("salary")
    application_deadline = request.form.get("application_deadline")
    job_email = request.form.get("job_email")
    job_phone = request.form.get("job_phone")
    return title, description, location, salary, application_deadline, job_email, job_phone
