from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from utils.assisstant import generate_response
from utils.storage import load, save
from csv import writer, reader

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    global email, question
    email = request.args.get('id')
    question = request.args.get('q')

    if not email:
        email = "guest"
    if not question:
        question = "You are a good leader because..."

    return render_template('index.html')

@app.route('/get_question', methods=['GET'])
def get_question():
    return jsonify({'question': question})

@app.route('/ask_ai', methods=['POST'])
def ask_ai():
    data = request.json
    question = data.get('question')
    answer = data.get('answer')
    ai_response = generate_response(question, answer)
    return jsonify({'ai_response': ai_response})

@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    data = request.json
    question = data.get('question')
    answer = data.get('answer')
    ai_response = data.get('aiResponse')
    save((email, question, answer, ai_response))
    return jsonify({'message': 'Answer submitted successfully!'})

@app.route('/get_answers', methods=['GET'])
def get_answers():
    data = load()
    return jsonify({'data': data})

if __name__ == '__main__':
    app.run(debug=True)
