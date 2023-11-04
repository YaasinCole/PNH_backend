# Test Execution Report for Password Tests

## Test Case Information
- Test Case Name: Password Test
- Test Case ID: TC-03

## Test Execution Summary
- Test Environment: "http://localhost:3000/"
- Test Data Preparation: MySQL test database
- Browsers Tested: Chrome, Firefox, Microsoft Edge
- Test Execution Status: Pass
- Test Duration: 5 mins

## Test Execution Results
- Test Step 1: User enters a valid email address.
  - Result: Pass

- Test Step 2: User enters a invalid password.
  - Result: Pass

- Test Step 3: User clicks the "login" button.
  - Result: Pass

- Expected Results: User should be not be able to login to the application and error message should show "Incorrect login details".
  - Actual Results: User was not able to login and error message pops up.

## Pass/Fail Criteria
- Pass: User is unable to gain access into application. 
- Fail: User is able to login in regardless of incorrect password

## Test Execution Comments
- The test case executed successfully in all tested browsers.
- No issues were encountered during the test execution.

## Test Execution Conclusion
The password test case (TC-03) has passed, and password is functioning as expected.
