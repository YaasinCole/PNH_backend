"""Importing all neccessary Flask that will help us run our app"""
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from models import db, ma, User, UserSchema, Location, locationSchema
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

db.init_app(app)
ma.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

user_schema = UserSchema()
user_schemas = UserSchema(many=True)

location_schema = locationSchema()
location_schemas = locationSchema(many=True)

with app.app_context():
    db.create_all()


@login_manager.user_loader
def loader_user(user_id):
    return User.query.get(user_id)


@app.route('/get', methods=['GET'])
def return_home():
    """
    This function handles the '/api/home' route.

    It responds with a JSON message, 'Hello World!'.
    """
    return jsonify()


@app.route('/get/<id>/', methods=['GET'])
def get_by_id(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)


@app.route('/delete/<id>/', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)


@app.route('/delete/<id>/', methods=['DELETE'])
def delete_location(id):
    location = Location.query.get(id)
    db.session.delete(location)
    db.session.commit()

    return user_schema.jsonify(location)


@app.route('/signup', methods=['POST'])
def signup_user():
    firstname = request.json['firstName']
    lastname = request.json['lastName']
    role = request.json['role']
    email = request.json['email']
    password = request.json['password']

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already Esists"}), 400

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password,
                    firstname=firstname, lastname=lastname, role=role)
    db.session.add(new_user)
    db.session.commit()

    session['user_id'] = new_user.id

    result = user_schema.dump(new_user)

    return jsonify(result)


@app.route('/addlocation', methods=['POST'])
def add_location():
    title = request.json['title']
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    phonenumber = request.json['phonenumber']
    latitude = request.json['latitude']
    longitude = request.json['longitude']

    user_exists = Location.query.filter_by(
        firstname=firstname).first() is not None

    if user_exists:
        return jsonify({"error": "User already Esists"}), 400

    new_userlocation = Location(title=title, firstname=firstname, lastname=lastname, email=email,
                                phonenumber=phonenumber, latitude=latitude, longitude=longitude)
    db.session.add(new_userlocation)
    db.session.commit()

    session['user_id'] = new_userlocation.id

    result = location_schema.dump(new_userlocation)
    print(result)
    return jsonify(result)


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorised"}), 401

    session["user_id"] = user.id

    result = user_schema.dump(user)

    return jsonify(result)


@app.route("/getlocations", methods=['GET'])
def getlocations():
    all_locations = Location.query.all()
    results = location_schemas.dump(all_locations)
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, port=8080)
