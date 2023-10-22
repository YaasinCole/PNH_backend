"""Importing all neccessary Flask that will help us run our app"""
import datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost:3308/flasktrial'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://:root@mysql-container:3306/flasktrial'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

ma = Marshmallow(app)
db = SQLAlchemy(app)


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


article_schema = ArticleSchema()
article_schemas = ArticleSchema(many=True)

with app.app_context():
    db.create_all()


@app.route('/get', methods=['GET'])
def return_home():
    """
    This function handles the '/api/home' route.

    It responds with a JSON message, 'Hello World!'.
    """
    all_articles = Articles.query.all()
    results = article_schemas.dump(all_articles)
    return jsonify(results)


@app.route('/get/<id>/', methods=['GET'])
def get_by_id(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
def add_article():
    title = request.json['title']
    body = request.json['body']

    article = Articles(title, body)
    db.session.add(article)
    db.session.commit()

    # Serialize the article object
    result = article_schema.dump(article)

    return jsonify(result)


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    articles = Articles.query.get(id)

    title = request.json['title']
    body = request.json['body']

    articles.title = title
    articles.body = body

    db.session.commit()
    return article_schema.jsonify(articles)


@app.route('/delete/<id>/', methods=['DELETE'])
def article_delete(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)


if __name__ == '__main__':
    app.run(debug=True, port=8080)
