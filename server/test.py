# pylint: disable=no-name-in-module
import unittest
from flask_testing import TestCase
from config import TestConfig
from server import app, db, Articles


class BaseTestCase(TestCase):
    def create_app(self):
        app.config.from_object(TestConfig)  # Use the testing configuration
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


class TestYourEndpoints(BaseTestCase):
    def test_get_home(self):
        response = self.client.get('/get')
        self.assertStatus(response, 200)  # Check if the response status is 200
        # You can add more assertions to check the response data as needed

    def test_get_by_id(self):
        # Add a test for the '/get/<id>/' route
        response = self.client.get('/get/1/')
        self.assertStatus(response, 200)
        # You can add more assertions to check the response data as needed

    def test_add_article(self):
        # Add a test for the '/add' route
        data = {'title': 'Test Title', 'body': 'Test Body'}
        response = self.client.post('/add', json=data)
        self.assertStatus(response, 200)
        # You can add more assertions to check the response data as needed

    def test_update_article(self):
        # Create an article to be updated
        article = Articles(title='Test Title', body='Test Body')
        with app.app_context():
            db.session.add(article)
            db.session.commit()

        data = {'title': 'Updated Title', 'body': 'Updated Body'}
        response = self.client.put('/update/1/', json=data)
        self.assertEqual(response.status_code, 200)
    # Add more assertions as needed

    def test_delete_article(self):
        # Create an article to be deleted
        article = Articles(title='Test Title', body='Test Body')
        with app.app_context():
            db.session.add(article)
            db.session.commit()

        response = self.client.delete('/delete/1/')
        self.assertEqual(response.status_code, 200)
    # Add more assertions as needed


if __name__ == '__main__':
    unittest.main()
