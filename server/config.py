

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql://root:''@localhost:3308/flasktrial'
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestConfig(Config):
    # Configuration for testing
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'  # Use SQLite for testing
    TESTING = True
