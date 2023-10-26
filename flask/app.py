from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required
import os   

app = Flask(__name__)

import mysql.connector

db = mysql.connector.connect(
    host='localhost',
    user="root",
    passwd='radu',
    database='jobrapid')

mycursor = db.cursor()

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

from controller.userController import register_user
@app.route("/api/users/registration", methods=['POST'])
def register_handler():
    response = register_user(mycursor, db, request, app.config['UPLOAD_FOLDER'])
    if "error" in response:
        return jsonify({"error": response["error"]})
    else:
        return jsonify({"message": response["message"]})


from controller.userController import login_user
@app.route("/api/users/login", methods=['POST'])
def login_handler():
    response = login_user(mycursor, request)
    if "error" in response:
        return jsonify({"error": response["error"]})
    else:
        return jsonify({"token": response["token"]})

from controller.userController import verify_user
@app.route("/api/users/verify", methods=['GET'])
@jwt_required()
def verify_handler():
    response = verify_user(mycursor)
    if "error" in response:
        return jsonify({"error": response["error"]})
    else:
        return response

from controller.userController import get_info
@app.route("/api/users/getinfo", methods=['GET'])
def get_info_handler():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    response = get_info(mycursor, response["id"])
    response["avatar"] = encode_image_as_base64("uploads/"+response["avatar"])
    return response

import base64

def encode_image_as_base64(image_path):
    with open(image_path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_image

from controller.userController import update_user
@app.route("/api/users/update", methods=['PUT'])
def update_profil():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    response = update_user(mycursor, db, request, response["id"], app.config['UPLOAD_FOLDER'])
    if("error" in response):
        return jsonify({"error": response["error"]})
    else:
        return jsonify({"message": response["message"], "token": response["token"]})

from controller.userController import student_apply
@app.route("/api/users/apply", methods=['POST'])
def student_apply_handle():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    print(response)
    if response["role"]=="Recruiter":
        return jsonify({"error": "Recruiter can't apply to a job"})
    try:
        response = student_apply(mycursor, db, request, response['id'])
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error creating job: {err}")
    
from controller.userController import recruiter_get_job
@app.route("/api/users/getjobs", methods=['GET'])
def recruiter_get_job_handle():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    print(response)
    if response["role"]=="Student":
        return jsonify({"error": "Student can't access jobs list"})
    try:
        response = recruiter_get_job(mycursor, response['id'])
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error creating job: {err}")
    
#http://127.0.0.1:5000/api/users/getstudents?job_id=127
from controller.userController import recruiter_get_applied_students
@app.route("/api/users/getstudents", methods=['GET'])
def recruiter_get_applied_students_handle():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    print(response)
    if response["role"]=="Student":
        return jsonify({"error": "Student can't access jobs list"})
    try:
        response = recruiter_get_applied_students(mycursor, request, response['id'])
        if "error" in response:
            return jsonify({"error": response["error"]})
        for res in response:
            if(res["avatar"] != "NULL"):
                res["avatar"] = encode_image_as_base64("uploads/"+res["avatar"])
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error creating job: {err}")
    
from controller.userController import change_applied_status
@app.route("/api/users/changestatus", methods=['PUT'])
def change_applied_status_handle():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    print(response)
    if response["role"]=="Student":
        return jsonify({"error": "Student can't access jobs list"})
    try:
        response = change_applied_status(mycursor, db, request, response['id'])
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error creating job: {err}")

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Custom error handler for JSON responses
@app.errorhandler(400)
def handle_bad_request(e):
    response = jsonify(error=str(e))
    response.status_code = 400
    return response

from controller.jobController import create_job_
# POST: Create a new job
@app.route("/api/jobs/post", methods=["POST"])
def create_job():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    print(response)
    if response["role"]=="Student":
        return jsonify({"error": "Student can't create job"})
    try:
        response = create_job_(mycursor, db, request, response['id'])
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error creating job: {err}")

# GET: Retrieve all jobs
# http://127.0.0.1:5000/api/jobs/page?criteria=created&order=ASC&page_num=3
from controller.jobController import get_all_jobs
@app.route("/api/jobs/page", methods=["GET"])
def get_jobs():
    try:
        response = get_all_jobs(mycursor, request)
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error retrieving jobs: {err}")

# GET: Retrieve a job by ID
# http://127.0.0.1:5000/api/jobs/get/?job_id=120
from controller.jobController import get_job_by_id
@app.route("/api/jobs/get", methods=["GET"])
def get_job():
    try:
        response = get_job_by_id(mycursor, request, handle_bad_request)
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error retrieving job: {err}")

# PUT: Update a job by ID
# http://127.0.0.1:5000/api/jobs/put/?job_id=125
from controller.jobController import update_job_by_id
@app.route("/api/jobs/put", methods=["PUT"])
def update_job():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    try:
        response = update_job_by_id(mycursor, db, request, response["id"])
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error updating job: {err}")

# DELETE: Delete a job by ID
from controller.jobController import delete_job_by_id
@app.route("/api/jobs/delete", methods=["DELETE"])
def delete_job():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    try:
        response = delete_job_by_id(mycursor, db, request, response["id"])
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error deleting job: {err}")

# GET: Get all the available tags from the db
from controller.jobController import get_all_available_tags
@app.route("/api/jobs/tags/get", methods=["GET"])
def get_all_tags():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    try:
        response = get_all_available_tags(mycursor)
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error getting all available tags: {err}")

# GET: Get all the tags related to a job id
from controller.jobController import get_tags_for_job
@app.route("/api/jobs/tags/get/<int:job_id>", methods=["GET"])
def get_job_tags(job_id):
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    try:
        response = get_tags_for_job(mycursor, job_id)
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error getting tags for job: {err}")

# POST: Add tags to job
from controller.jobController import add_tags_to_job
@app.route("/api/jobs/tags/add", methods=["POST"])
def add_job_tags():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    if response["role"] == "Student":
        return jsonify({"error": "Student can't add tags to jobs"})
    try:
        response = add_tags_to_job(mycursor, db, request)
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error adding tags: {err}")

# PUT: Update job tags
from controller.jobController import update_tags_for_job
@app.route("/api/jobs/tags/put", methods=["PUT"])
def update_job_tags():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    if response["role"] == "Student":
        return jsonify({"error": "Student can't update job tags"})
    try:
        response = update_tags_for_job(mycursor, request, db)
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error updating tags: {err}")

# DELETE: Delete tags from a job by ID
from controller.jobController import delete_tags_from_job
@app.route("/api/jobs/tags/delete", methods=["DELETE"])
def delete_job_tags():
    response = verify_handler()
    if response == "Invalid token":
        return jsonify({"error": response})
    try:
        response = delete_tags_from_job(mycursor, request, db)
        return response
    except mysql.connector.Error as err:
        return handle_bad_request(f"Error deleting tags: {err}")


@jwt.invalid_token_loader
def my_invalid_token_callback(invalid_token):
    return jsonify({"error": "Invalid token"})


# Email Send
from controller.emailController import send_email
@app.route("/api/email", methods=["POST"])
def send_email_handler():
    try:
        send_email(request)
        return jsonify({"message": "Successfully sended"})
    except KeyError as err:
        return jsonify({"error": "Email was not sended"})



if __name__ == "__main__":
    app.run(debug=True)