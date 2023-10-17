"""Importing all neccessary Flask that will help us run our app"""
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/home', methods=['GET'])
def return_home():
    """
    This function handles the '/api/home' route.

    It responds with a JSON message, 'Hello World!'.
    """
    return jsonify({
        'message': 'HelloI am displaying a message',
        'people': ["Jace", "Harry", "Barry"]
    })


if __name__ == '__main__':
    app.run(debug=True, port=8080)
