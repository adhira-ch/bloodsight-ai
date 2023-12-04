from flask import Flask, request, jsonify,send_file
from flask_cors import CORS
import PyPDF2
import csv
import os
import random
import string
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = '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'
PATIENT_INFO_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'patient_info')
USERS_FILE = os.path.join(PATIENT_INFO_DIR, 'users.csv')

os.makedirs(PATIENT_INFO_DIR, exist_ok=True)

def generate_user_id():
    return ''.join(random.choices(string.digits, k=6))

os.makedirs('patient_info', exist_ok=True)

@app.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    password = request.form['password']
    firstName = request.form.get('firstName', '')
    lastName = request.form.get('lastName', '')
    birthday = request.form.get('birthday', '')
    gender = request.form.get('gender', '')
    race = request.form.get('race', '')
    doctorsOffice = request.form.get('doctorsOffice', '')

    if user_exists(email):
        return jsonify({'status': 'failure', 'message': 'User already exists'})

    user_id = generate_user_id()
    user_dir = os.path.join(PATIENT_INFO_DIR, user_id)
    os.makedirs(user_dir, exist_ok=True)

    user_info = [user_id, email, password, firstName, lastName, birthday, gender, race, doctorsOffice]

    with open(os.path.join(user_dir, 'info.csv'), 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(user_info)

    if 'labReport' in request.files:
        lab_report = request.files['labReport']
        lab_report_filename = "labreport.pdf"
        lab_report_path = os.path.join(user_dir, lab_report_filename)
        lab_report.save(lab_report_path)

        # Convert PDF to text immediately after saving
        text_content = convert_pdf_to_text(lab_report_path)
        lab_report_txt_path = os.path.join(user_dir, 'lab_report.txt')
        with open(lab_report_txt_path, 'w') as text_file:
            text_file.write(text_content)

    with open(USERS_FILE, 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([user_id, email, password, firstName, lastName, birthday, gender, race, doctorsOffice])
    return jsonify({'status': 'success', 'user_id': user_id})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    with open(USERS_FILE, 'r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[1] == email and row[2] == password:
                return jsonify({'status': 'success', 'user_id': row[0]})

    # If no match is found, return failure response
    return jsonify({'status': 'failure', 'message': 'Invalid credentials'})

def user_exists(email):
    if os.path.exists('users.csv'):
        with open('users.csv', 'r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                if row[1] == email:
                    return True
    return False

@app.route('/get_user_data/<user_id>', methods=['GET'])
def get_user_data(user_id):
    user_info_file = os.path.join(PATIENT_INFO_DIR, user_id, 'info.csv')
    if os.path.exists(user_info_file):
        with open(user_info_file, 'r', newline='') as file:
            reader = csv.reader(file)
            user_info = next(reader)  # Assumes only one row per user
            if user_info:
                first_name, last_name = user_info[3], user_info[4]
                return jsonify({'status': 'success', 'firstName': first_name, 'lastName': last_name})
    return jsonify({'status': 'failure', 'message': 'User not found'})

def convert_pdf_to_text(filepath):
    with open(filepath, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:  # Use len(reader.pages) for iterating through pages
            text += page.extract_text()  # 'extract_text()' is the updated method name
    return text

@app.route('/get_lab_report/<user_id>', methods=['GET'])
def get_lab_report(user_id):
    lab_report_pdf_path = os.path.join(PATIENT_INFO_DIR, user_id, 'labreport.pdf')
    lab_report_txt_path = os.path.join(PATIENT_INFO_DIR, user_id, 'lab_report.txt')

    # Check if the text version of the lab report exists
    if os.path.exists(lab_report_txt_path):
        return send_file(lab_report_txt_path, as_attachment=False)

    # If the text version does not exist but the PDF does, convert and save it
    elif os.path.exists(lab_report_pdf_path):
        text_content = convert_pdf_to_text(lab_report_pdf_path)
        with open(lab_report_txt_path, 'w') as text_file:
            text_file.write(text_content)
        return send_file(lab_report_txt_path, as_attachment=False)

    else:
        return jsonify({'status': 'failure', 'message': 'Lab report not found'}), 404
    
@app.route('/get_user_info/<user_id>', methods=['GET'])
def get_user_info(user_id):
    user_info_file = os.path.join(PATIENT_INFO_DIR, user_id, 'info.csv')
    if os.path.exists(user_info_file):
        with open(user_info_file, 'r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                # Assuming user_id, email, password, firstName, lastName, birthday, gender, race, doctorsOffice
                user_id, _, _, first_name, last_name, birthday, gender, race, doctorsOffice = row
                age = calculate_age(birthday)
                print(age)
                return jsonify({
                    'status': 'success', 
                    'firstName': first_name, 
                    'lastName': last_name, 
                    'gender': gender, 
                    'age': age, 
                    'race': race,
                    'bloodType': 'A',  # Default blood type
                    'doctorsOffice': doctorsOffice,
                })
    return jsonify({'status': 'failure', 'message': 'User not found'})

def calculate_age(birthday):
    from datetime import datetime
    birth_date = datetime.strptime(birthday, '%Y-%m-%d')
    today = datetime.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

def call_openai_api(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",  # or the specific chat model you intend to use
        messages=[
             {"role": "system", "content": "You are a helpful medical assistant providing medical assistance in reading blood reports."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content'].strip()

@app.route('/get_ed_plan/<user_id>', methods=['GET'])
def get_ed_plan(user_id):
    user_dir = os.path.join(PATIENT_INFO_DIR, user_id)
    ed_plan_path = os.path.join(user_dir, 'edplan.txt')
    lab_report_path = os.path.join(user_dir, 'lab_report.txt')

    # Check if exercise & diet plan already exists
    if os.path.exists(ed_plan_path):
        with open(ed_plan_path, 'r') as file:
            return file.read()

    # If edplan does not exist, create it using lab_report.txt
    if os.path.exists(lab_report_path):
        with open(lab_report_path, 'r') as file:
            patient_labs = file.read()
        prompt = "Provide plans for exercise & diet plan to improve overall health based on blood test- Provide 3 sentences for exercise recommendations (include amount of time recommended) and 3 sentences for diet recommendations (include recommended calorie intake): " + patient_labs
        
        try:
            gpt_response = call_openai_api(prompt)
            print("reached")
        except Exception as e:
            return jsonify({'status': 'failure', 'message': str(e)}), 500

        with open(ed_plan_path, 'w') as file:
            file.write(gpt_response)

        return gpt_response

    return jsonify({'status': 'failure', 'message': 'Lab report not found'}), 404

@app.route('/get_disease_sus/<user_id>', methods=['GET'])
def get_disease_sus(user_id):
    user_dir = os.path.join(PATIENT_INFO_DIR, user_id)
    disease_sus_path = os.path.join(user_dir, 'diseases.txt')
    lab_report_path = os.path.join(user_dir, 'lab_report.txt')

    # Check if disease sus already exists
    if os.path.exists(disease_sus_path):
        with open(disease_sus_path, 'r') as file:
            return file.read()

    # If edplan does not exist, create it using lab_report.txt
    if os.path.exists(lab_report_path):
        with open(lab_report_path, 'r') as file:
            patient_labs = file.read()

        prompt = "Predict the top 3 lifestyle or chronic diseases the individual is most susceptible to based on the lab report (provide percentage of individuals with similar lab reports who have the disease, provide exact parameters that make them susceptible to the disease). Provide it in the exact format below for each disease (include no text before or after explaining the interpretation of lab test results) Disease- Overview of Disease, Key Indicators & Exact Value for Patient based on the following lab report: " + patient_labs
        
        try:
            gpt_response = call_openai_api(prompt)
            print("reached")
        except Exception as e:
            return jsonify({'status': 'failure', 'message': str(e)}), 500

        with open(disease_sus_path, 'w') as file:
            file.write(gpt_response)

        return gpt_response
    


    return jsonify({'status': 'failure', 'message': 'Lab report not found'}), 404

@app.route('/get_body_status/<user_id>', methods=['GET'])
def get_body_status(user_id):
    user_dir = os.path.join(PATIENT_INFO_DIR, user_id)
    body_status_path = os.path.join(user_dir, 'bodyStatus.txt')
    lab_report_path = os.path.join(user_dir, 'lab_report.txt')

    # Check if disease sus already exists
    if os.path.exists(body_status_path):
        with open(body_status_path, 'r') as file:
            return file.read()

    # If edplan does not exist, create it using lab_report.txt
    if os.path.exists(lab_report_path):
        with open(lab_report_path, 'r') as file:
            patient_labs = file.read()

        prompt = "Provide blood health parameters, lipid profile, kidney profile, electrolyte profile, vitamin profile, thyroid health, diabetes monitoring, liver profile, & anemia profile stages in the following format based on the blood test results (For categories with parameters outside of optimal range display: Blood Health: Parameter, Your Result, Optimal Range    For categories with all parameters inside optimal range only display the following: All parameters within normal range.    For categories with parameters not measured: Parameters have not been measured.): " + patient_labs
        try:
            gpt_response = call_openai_api(prompt)
            print("reached")
        except Exception as e:
            return jsonify({'status': 'failure', 'message': str(e)}), 500

        with open(body_status_path, 'w') as file:
            file.write(gpt_response)

        return gpt_response

if __name__ == '__main__':
    app.run(debug=True, port=5005)