import mysql.connector
from datetime import datetime
import bcrypt
import base64
from flask_jwt_extended import create_access_token
from datetime import timedelta
import uuid
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_avatar(file, folder_name):

    if not file or file.filename == '':
        filename = "NULL"
    elif allowed_file(file.filename):
        filename = secure_filename(str(uuid.uuid4()))+file.filename[file.filename.find("."):];
        file.save(os.path.join(folder_name, filename))
        return filename
    else:
        return {"error": "Invalid image format"}

def register_user(mycursor, db, request, folder_name):
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    date_of_birth = request.form.get('date_of_birth')
    address = request.form.get('address')
    gender = request.form.get('gender')
    skills = request.form.get('skills')
    password = request.form.get('password')
    role = request.form.get('role')
    
    mycursor.execute("SELECT count(*) FROM user WHERE email=%s", (email,))
    checking_email = mycursor.fetchone()
    if checking_email[0]>0:
        return {"error": "Email has already been taken"}
    
    if not (first_name and last_name and email and phone and gender and password):
        return {"error": "Please fill in all fields"}

#     file = request.files['image']
#     filename = upload_avatar(file, folder_name)
#     print(file)
    filename = "NULL"

    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt(rounds=12)
    hashed_password = bcrypt.hashpw(password_bytes, salt)

    sql = "INSERT INTO user (first_name, last_name, email, phone, date_of_birth, address, gender, skills, password, created, avatar, role) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (first_name, last_name, email, phone, date_of_birth, address, gender, skills, hashed_password, datetime.now(), filename, role)
    mycursor.execute(sql, values)
    db.commit()
    return {"message": "Successfully registered"}

def generate_token(id,first_name, last_name, email, role):
    return create_access_token(identity={"id": id, "email": email,"first_name": first_name, "last_name": last_name, "role": role}, expires_delta=timedelta(days=30))


def login_user(mycursor, request):
    email = request.form.get('email')
    password = request.form.get('password')
    if not(email and password):
        return {"error": "Please fill in all fields"}
    mycursor.execute("SELECT user_id, password, first_name, last_name, email, role FROM user WHERE email=%s", (email, ))
    result = mycursor.fetchone()
    if(result is None):
        return {"error": "Invalid credentials"}
    if(bcrypt.checkpw(password.encode('utf-8'), result[1].encode('utf-8'))):
        return {"token": generate_token(result[0],result[2], result[3], result[4], result[5])}

from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

def verify_user(mycursor):
    verify_jwt_in_request()
    current_user = get_jwt_identity()
    if "id" not in current_user and "email" not in current_user and "first_name" not in current_user and "last_name" not in current_user:
        return {"error": "Invalid token"}
    mycursor.execute("SELECT COUNT(*) FROM user WHERE user_id=%s and email=%s and first_name=%s and last_name=%s", (current_user["id"], current_user["email"], current_user["first_name"], current_user["last_name"]))
    checking_token = mycursor.fetchone()
    mycursor.fetchall()

    # tokenul poate sa fie correct, dar user-ul pe care il contine poate sa nu fie in bd
    if(checking_token[0]>0):
        return current_user
        # return {
        #     "email":current_user["email"],
        #     "first_name":current_user["first_name"],
        #     "last_name":current_user["last_name"],
        # }
        # return {"response": "Valid Token"}
    else:
        return "Invalid token"

def get_info(mycursor, user_id):
    try:
        mycursor.execute("SELECT first_name, last_name, email, phone, date_of_birth, address, gender, skills, avatar, role FROM user WHERE user_id=%s", (user_id,))
        result = mycursor.fetchone()

        # Consume any pending results
        mycursor.fetchall()
        return {
            "first_name": result[0],
            "last_name": result[1],
            "email": result[2],
            "phone": result[3],
            "date_of_birth": result[4],
            "address": result[5],
            "gender": result[6],
            "skills": result[7],
            "avatar": result[8],
            "role": result[9]
        }
    except mysql.connector.Error as e:
        # Handle the error, e.g., attempt to reconnect and retry the query.
        return jsonify({"Error" : f"{e}"})
        # You can implement reconnect logic here.

def delete_avatar(filename, folder_name):
    try:
        file_path = os.path.join(folder_name, filename)
        if os.path.exists(file_path):
            # Delete the file
            os.remove(file_path)
            return {"message": "Image deleted successfully"}
        else:
            return {"error": "File not found"}
    except Exception as e:
        return {"error": str(e)}


def update_user(mycursor, db, request, id, folder_name):
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    date_of_birth = request.form.get('date_of_birth')
    address = request.form.get('address')
    gender = request.form.get('gender')
    skills = request.form.get('skills')
    file = request.files['image']

    try:
        mycursor.execute("SELECT first_name, last_name, email, phone, date_of_birth, address, gender, skills, avatar FROM user WHERE user_id=%s", (id,))
        result = mycursor.fetchone()
        image_name = result[8]
        if(image_name!=file.filename):
            delete_avatar(image_name, folder_name)
            filename = upload_avatar(file, folder_name)
            sql = ("UPDATE user SET first_name=%s, last_name=%s, email=%s, phone=%s, date_of_birth=%s, address=%s, gender=%s, skills=%s, avatar=%s WHERE user_id = %s")
            values = (first_name, last_name, email, phone, date_of_birth, address, gender, skills, filename, id)
            mycursor.execute(sql, values)
            db.commit()
        else:
            sql = ("UPDATE user SET first_name=%s, last_name=%s, email=%s, phone=%s, date_of_birth=%s, address=%s, gender=%s, skills=%s WHERE user_id = %s")
            values = (first_name, last_name, email, phone, date_of_birth, address, gender, skills, id)
            mycursor.execute(sql, values)
            db.commit()
        return {"message": "Successfully updated", "token": generate_token(id, first_name, last_name, email)}
    
    except mysql.connector.Error as err:
        return {"error": str(err)}


def update_avatar_filename(mycursor, db, id, filename):
    sql = ("UPDATE user SET avatar=%s WHERE user_id=%s")
    values = (filename, id)
    mycursor.execute(sql, values)
    db.commit()
    return {"message": "Successfully updated"}


def student_apply(mycursor, db, request, user_id):
    job_id = request.form.get("job_id")
    # Check if student already applied to this job
    sql = "SELECT COUNT(*) FROM jobs WHERE job_id = %s"
    values = (job_id,)  # Note the comma to create a tuple with a single element
    mycursor.execute(sql, values)
    check = mycursor.fetchone()
    if check[0] < 1:
        return {"error": "No such job id"}

    sql = "SELECT COUNT(*) FROM student_job WHERE student_id = %s AND job_id = %s"
    values = (user_id, job_id)
    mycursor.execute(sql, values)
    check = mycursor.fetchone()
    if check[0] > 0:
        return {"error": "Student already applied to this job"}
    
    sql = "INSERT INTO student_job (student_id, job_id, created_date, status) VALUES (%s, %s, %s, %s)"
    values = (user_id, job_id, datetime.now(), "Waiting")
    mycursor.execute(sql, values)
    db.commit()
    return {"message": "Student successfully applied"}

def recruiter_get_job(mycursor, user_id):
    sql = "SELECT * FROM jobs WHERE user_id = %s;"
    values = (user_id,)
    mycursor.execute(sql, values)
    
    jobs_list = []

    for row in mycursor.fetchall():
        job_dict = {
            "job_id": row[0],
            "title": row[1],
            "description": row[2],
            "user_id": row[3],
        }
        jobs_list.append(job_dict)

    return jobs_list

def recruiter_get_applied_students(mycursor, request,user_id):
    job_id = request.args.get('job_id', type=int)
    if job_id is None:
        return {"error": "Should receive job_id"}
    sql = "SELECT count(*) FROM jobs WHERE user_id = %s AND job_id = %s;"
    values = (user_id, job_id)
    mycursor.execute(sql, values)
    check = mycursor.fetchone()

    if check is None:
        return {"error": "No such job or user didn't create this job"}

    if check[0] < 1:
        return {"error": "No such job or user didn't create this job"}

    
    sql = '''SELECT u.user_id, u.first_name, u.last_name, u.email, u.phone, 
    u.date_of_birth, u.address, u.gender, u.skills, u.avatar, s.created_date, s.status
    FROM user u JOIN student_job s ON u.user_id = s.student_id WHERE s.job_id=%s;'''
    values = (job_id,)
    mycursor.execute(sql, values)
    
    applied_students = []

    for row in mycursor.fetchall():
        student_dict = {
            "user_id": row[0],
            "first_name": row[1],
            "last_name": row[2],
            "email": row[3],
            "phone": row[4],
            "date_of_birth": row[5],
            "address": row[6],
            "gender": row[7],
            "skills": row[8],
            "avatar": row[9],
            "created_date": row[10],
            "status": row[11]
        }
        applied_students.append(student_dict)

    return applied_students

def change_applied_status(mycursor, db, request, user_id):
    student_id = request.form.get("student_id")
    job_id = request.form.get("job_id")
    status = request.form.get("status")
    sql = "SELECT count(*) FROM jobs WHERE user_id = %s AND job_id = %s;"
    values = (user_id, job_id)
    mycursor.execute(sql, values)
    check = mycursor.fetchone()

    if check is None:
        return {"error": "No such job or user didn't create this job"}

    if check[0] < 1:
        return {"error": "No such job or user didn't create this job"}

    sql = "SELECT count(*) FROM student_job WHERE student_id = %s AND job_id = %s;"
    values = (student_id, job_id)
    mycursor.execute(sql, values)
    check = mycursor.fetchone()

    if check is None:
        return {"error": "Student didn't apply for this job"}

    if check[0] < 1:
        return {"error": "Student didn't apply for this job"}
    
    sql = '''UPDATE student_job SET status=%s WHERE job_id=%s AND student_id=%s'''
    values = (status, job_id, student_id)
    mycursor.execute(sql, values)
    db.commit()
    

    
    return {"message": "Successfully changed status"}
