### Update Profile Endpoint (Email & Password)

#### Task:

Create a Node.js API endpoint that allows users to update their profile by modifying their email and/or password. Store the updated data in a PostgreSQL database.


#### Instructions:

1. **Create Users Table using NeonConsole:**
   - Ensure a users table exists with columns:
      - id - primary key, auto-increment
      - email - string
      - password - string (plain-text or hashed)
   - Insert some test data so endpoints can be tested

2. **Create an Update Profile Endpoint:**
   - Set up an Express server and create a PUT /profile/:id endpoint.
   - Extract the id from the route parameter.
   - Accept user data in the request body: email and/or password.
   - Validate that at least one field (email or password) is provided. If not, return an error response.
   - If password is provided:
      - Validate the password (e.g., minimum length).
      - Optionally use bcrypt to hash the password before storing it in the database.
   - Update the existing user in the users table in PostgreSQL with columns: id, email, password.
   
3. **PostgreSQL Setup:**
   - Ensure PostgreSQL is set up.
   - Use a package like pg to connect Node.js to PostgreSQL

4. **Expected Interactions:**
   - Update Request:
      - The client sends a PUT request to /profile/:id with email and/or password.
      - If the user exists and at least one field is provided, update the record and return a success message.
      - If the id does not exist, return an error message.
      - If no fields are provided, return an appropriate error message.
      - Example:
        `PUT /profile/1

        ```json
        {
           "email": "newemail@example.com",
           "password": "newPassword123"
        }
        ```

      - Expected response:
         - Success: Profile update successfully
         - Error:
           ```json
           {
              "error": "Please provide email or password to update"
           }
           ```
    - Testing the Endpoint:
       - Use ThunderClient/ Postman or a similar tool to send test requests to your API.
       - Verify that the user is correctly updated in the PostgreSQL database.


5. **Reference:**
   - Creating an Express application: https://expressjs.com/en/5x/api.html 
   
   - Express Routing: https://www.w3schools.com/nodejs/nodejs_express.asp#BasicRouting 
   
   - PostgreSQL with Node.js: Connection: https://neon.com/docs/guides/express (node-postgres)
   
   - PostgreSQL with Node.js: Query: https://marmelab.com/postgres-queries/pool.html 
   
   - PostgreSQL CREATE Table: https://www.w3schools.com/postgresql/postgresql_create_table.php
   
   - PostgreSQL SELECT: https://www.w3schools.com/postgresql/postgresql_select.php 
   
   - PostgreSQL INSERT: https://www.w3schools.com/postgresql/postgresql_insert_into.php 
   
   - PostgreSQL UPDATE: https://www.w3schools.com/postgresql/postgresql_update.php 



