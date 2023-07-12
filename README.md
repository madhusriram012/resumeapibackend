# Resume Builder API backend

A Resume Builder API is a tool that allows users to create professional resumes quickly and easily. The API uses pre-built templates and dynamically generates the resume content based on the user's input data, such as personal information, skills, experiences, and education. This reduces the manual effort required to create and format a resume. The program for document Generation API is written in **node.js** using the SDK.

### How to run

### Step 1: Clone the repository
```bash
git clone https://github.com/madhusriram012/resumeapibackend.git
```

### Step 2: Install dependencies
To add node_modules, type npm install in terminal.
```bash
cd resumeapibackend
npm install 
```
If error persists while running the above command ,simply delete the node_modules folder and repeat the process.

### Step 3: To start server
```bash
  npm start
```

1. After running the above command, the server is up and ready to receive requests and send reponses.To visualize it as a client head back to the frontend part of the website which is in

```shell
 https://github.com/madhusriram012/resumeapifrontend
```

copy the above url and paste in browser and follow the steps in readme over there(from how to run in frontend as we have successfully started the server).

# How to run test

```shell
npm test (or)
jest (or)
npm run test
```

# How to fix code styling

```shell
npm run prettier-fix
```

## Project Structure

1. `output` folder contains the response from api in the form of .pdf
2. `resources` folder contains the input .docx file.
3. `src` folder contains modularized code files.
   1. `auth` contains authentication
   2. `controller` handles request,response for the endpoints.
   3. `error` contains custom error for defined.
   4. `service` contains business logic.
   5. `validators` contains validations.
4. `tests` folder contains unit tests of all the codes.

# To see the backend api function implementation without frontend, you can use [postman](https://www.postman.com/) 
  1.Start the server first by typing `npm start`, then head over to postman.
  
  2.Create a new workspace or use your existing workspace in postman.  
  
  3.The workspace will look like below 
  
<img width="1437" alt="image" src="https://github.com/madhusriram012/resumeapibackend/assets/75003175/e3304c74-0ae0-4f31-b498-82414399837e">
(use Desktop Agent as show in image)

### Endpoint

The endpoint should be authenticated with username and password.
To generate the resume, please follow the below steps,

1. Login with below endpoint

**POST `http://localhost:8081/login`**

**Body(in json format)**

```json
{
    "username": "admin",
    "password": "admin"
}
```

2) Copy the accessToken from the response
  
3) Add the token as type `Bearer Token` for the below endpoint in the area shown in the picture.The end point and the body(in json format) is available below the picture

<img width="1016" alt="image" src="https://github.com/madhusriram012/resumeapibackend/assets/75003175/d55a5051-0047-49f2-8d78-0812a1aa14ae">

**POST `http://localhost:8081/resume/`**

**Body**

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
    "education": [
        {
            "schoolName": "school",
            "passingYear": "2011-2013",
            "description": "my school"
        }
    ],
    "experience": [
        {
            "companyName": " company",
            "passingYear": "2011-2013",
            "responsibilities": "responsibilities"
        }
    ],
    "achievements": [
        {
            "field": "field",
            "awards": "awards"
        }
    ]
}
```

Possible Template Ids

-   1
-   2
-   3

# Output

The response from the API is stored as PDF under the output folder, like the image shown below.

![image](https://github.com/madhusriram012/resumeapibackend/assets/75003175/ffd73e35-58da-4f3c-9568-373107c28b11)


# Improvements

-   Adding rate-limit to the API calls
-   Adding deeper santization for all the json fields (e.g name field does not contain any illegal characters, max length etc.,)
-   This challenge does not consider security validation. The security validation like XSS including Markdown bypass
    SQL injections,NoSQL injections can be improved

# Possible errors

400 - Bad Request

404 - Template not found

401 - Unauthorized

500 - Internal Server error

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
   "templateId": "1",
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
