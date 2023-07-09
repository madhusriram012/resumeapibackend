### How to run
```shell
 npm install
 node server.js
```

### How to run test
```shell
npm test (or)
jest (or)
npm run test
```

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
* template1
* template2
* template3

### Improvements
* Adding rate-limit to the API calls
* Adding deeper santization for all the json fields (e.g name field does not contain any illegal characters, max length etc.,)

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
