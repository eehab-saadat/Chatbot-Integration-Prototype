import json

def load() -> list:
    try:
        with open('storage.json', 'r') as file:
            storage = json.load(file)
    except FileNotFoundError:
        storage = []
    return storage

def save(data_tuple: tuple) -> None:
    email, question, answer, ai_response = data_tuple
    data = {
        'email': email.replace('"',''),
        'question': question,
        'answer': answer,
        'ai_response': ai_response
    }
    try:
        with open('storage.json', 'r') as file:
            storage = json.load(file)
    except FileNotFoundError:
        storage = []
    storage.append(data)
    with open('storage.json', 'w') as file:
        json.dump(storage, file, indent=4)