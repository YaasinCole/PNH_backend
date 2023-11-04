# Test Case: Login

## Objective
Verify that users can successfully login to the application.

## Pre-conditions
- The user is on the login page.

## Test Steps
1. Enter a valid email address.
2. Enter a password.
3. Click the "Login" button.

## Expected Results
- The user should login successfully.

## Test Data
- Test User:
  - Email: testuser@example.com
  - Password: testpassword

## Test Data Preparation
- Ensure that the test database is clean with no pre-existing accounts.

## Test Execution
- Execute the test steps as described.
- Verify the user entring in the correct login details

## Pass/Fail Criteria
- Pass: User can login successfully and is able to see tha map
- Fail: Login fails, error message "Incorrect username or Password".
