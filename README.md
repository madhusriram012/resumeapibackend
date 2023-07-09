# Resume Builder API backend

This challenge aims to create a Resume Builder API that uses the Adobe Document Generation API to dynamically create PDF resumes from DOCX based templates.This repository is the backend part.  


### How to run
```shell
 npm install
 node server.js
```
1. After running the above command, the server is up and ready to receive requests and send reponses.To visualize it as a client head back to the frontend part of the website which is in
```shell
 https://github.com/madhusriram012/resumeapifrontend
```
 and follow the commands over there.

### How to run test
```shell
npm test (or)
jest (or)
npm run test
```
# For the following process you can use [postman](https://www.postman.com/) 
  1.Create a new workspace or use your existing workspace in postman.
  2.The workspace will look like below 
  <img width="1435" alt="image" src="https://github.com/madhusriram012/resumeapibackend/assets/75003175/88bc8a01-5425-44d1-9baf-81ffdea7f195">

### Endpoint
The endpoint should be authenticated with username and password.
To generate the resume, please follow the below steps,
1) Login with below endpoint

POST http://localhost:8081/login
Body
```json
{
    "username": "admin",
    "password": "admin"
}
```
2) Copy the accessToken from the response
3) Add the token as type `Bearer Token` for the below endpoint
POST `http://localhost:8081/resume/`

Body
```json
{
    "personalInformation": {
        "name": "test",
        "lastName": "test",
        "emailAddress": "xyz@gmail.com",
        "phoneNumber": "+441238726384",
        "linkedInUrl": "https://linkedin.com/myprofile"
    },
    "templateId": "1",
    "jobTitle": "Software",
    "careerObjective": "To become leader",
    "skills": ["Java"],
    "education": [{
        "schoolName": "school",
        "passingYear": "2011-2013",
        "description": "my school"
    }],
    "experience": [{
        "companyName": " company",
        "passingYear": "2011-2013",
        "responsibilities": "responsibilities"
    }],
    "achievements": [{
        "field":"field",
        "awards":"awards"
    }]
}
```

possible Template Ids
* 1
* 2
* 3

### Improvements
* Adding rate-limit to the API calls
* Adding deeper santization for all the json fields (e.g name field does not contain any illegal characters, max length etc.,)
* This challenge does not consider security validation. The security validation like XSS including Markdown bypass
 SQL injections,NoSQL injections can be improved

### cURL command
1. ```shell
   curl --location 'http://localhost:8081/login' \
   --header 'Content-Type: application/json' \
   --data '{
   "username": "admin",
   "password": "admin"
   }'
   ```
2. ```shell
   curl --location 'http://localhost:8081/resume/' \
   --header 'Authorization: Bearer {TOKEN_FROM_PREVIOUS_STEP}' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "personalInformation": {
   "name": "Test",
   "lastName": "Test",
   "emailAddress": "xyz@gmail.com",
   "phoneNumber": "+441238726384",
   "linkedInUrl": "http://test.com"
   },
   "templateId": "LinkTemplate",
   "jobTitle": "Software Engineer",
   "careerObjective": "leader",
   "skills": ["Java"],
   "education": [{
   "schoolName": "school",
   "passingYear": "2011-2013",
   "description": "my school"
   }],
   "experience": [{
   "companyName": " company",
   "passingYear": "2011-2013",
   "responsibilities": "responsibilities"
   }],
   "achievements": [{
   "field":"field",
   "awards":"awards"
   }]
   }'
   ```
