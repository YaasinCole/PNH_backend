from dotenv import load_dotenv
import os
import redis
load_dotenv()


class Config:
    SECRET_KEY = os.environ["SECRET_KEY"]
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:''@localhost:3308/flasktrial'
    SQLALCHEMY_DATABASE_URI = 'mysql://:root@mysql-container:3306/flasktrial'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True


class TestConfig(Config):
    # Configuration for testing
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'  # Use SQLite for testing
    TESTING = True
