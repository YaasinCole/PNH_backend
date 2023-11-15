from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from uuid import uuid4
import datetime

db = SQLAlchemy()
ma = Marshmallow()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.Text, nullable=False)
    firstname = db.Column(db.String(15))
    lastname = db.Column(db.String(15))
    role = db.Column(db.String(15))
    # userInfo = db.Column(db.Integer, forien_key=True, unique=True, default=True)

    def __init__(self, email, password, firstname, lastname, role):
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.role = role


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'password', 'firstname', 'lastname', 'role')


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20))
    firstname = db.Column(db.String(15))
    lastname = db.Column(db.String(15))
    email = db.Column(db.String(20))
    phonenumber = db.Column(db.Integer)
    latitude = db.Column(db.FLOAT, nullable=False)
    longitude = db.Column(db.FLOAT, nullable=False)

    def __init__(self, title, firstname, lastname, email, phonenumber, latitude, longitude):
        self.title = title
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.phonenumber = phonenumber
        self.latitude = latitude
        self.longitude = longitude


class locationSchema(ma.Schema):
    class Meta:
        fields = ['id', 'title', 'firstname', 'lastname',
                  'email', 'phonenumber', 'latitude', 'longitude']


class Articles(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')
