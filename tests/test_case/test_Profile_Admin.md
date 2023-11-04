# Test Case:  Profile Admin

## Objective
Verify that the correct user profile is on the application.

## Pre-conditions
-  user is on the add to map apge

## Test Steps
1. Enter new map information.
2. Navigate to add page.
3. Enter in information for new map user.
4. Navigate to Map View page.  

## Expected Results
- The user is able to add a new person to the map

## Test Data
- Test Form: 
  - name: testName 
  - Xcoordinate: 12:51:20 (example of coordiante)
  - Ycoordinate: 20:50:60 (example of coordinate)
  - Occupation : testOccupation

## Test Data Preparation
- Ensure that the test database is clean with no pre-existing accounts.

## Test Execution
- Execute the test steps as described.
- Verify that the user is able to get to the add person to map page.

## Pass/Fail Criteria
- Pass: Is able to add information to the map.
- Fail: Is unable to add information to the page Error message : "Invalid Information".
