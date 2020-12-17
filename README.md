# Apollo API

The repository for the front-end React wep application can be found [here](https://apollo-bot.vercel.app).

---

The Base URL: [https://apollo-be-api.herokuapp.com/](https://apollo-be-api.herokuapp.com)

The Database Design Schema: [DBDesigner](https://dbdesigner.page.link/msEfnXD14kH4NtQh9)

PostMan Collection of API Endpoints: [Endpoints](https://www.getpostman.com/collections/0cede12c1624dfc55e27)

The API includes various endpoints to handle all features of the Apollo application. The API handles user account creation and offers different account roles for control over Apollo. The back end server was built using Node, Knex, and express. Authentication was handled using JSON Web Tokens. The deployed application can be found [here](https://google.com).

## Authentication

The Apollo API uses JWT for authentication. After creating an account and logging in with credentials, a JWT will be auto-generated.

<details>

  <summary>POST to /register</summary>

  Creates a new user for Apollo

  Expected Request body:

  ```JSON
  {
    "first_name": "Joe",
    "last_name": "Doe",
    "email": "john@email.com",
    "password": "hashed with bcrypt"
  }
  ```

  Returned Response:

  ```JSON
  { "message": "SUCCESS: User with ID: 1 registered." }
  ```

</details>

<details>

  <summary>POST to /login</summary>

  Log in to Apollo with verified credentials

  Expected Request body:

  ```JSON
  {
    "email": "john@email.com",
    "password": "hashed with bcrypt"
  }
  ```

  Response:

  ```JSON
  {
    "message": "SUCCESS: User logged in.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJlbWFpbCI6ImpvZUBnbWFpbC5jb20iLCJpYXQiOjE2MDQ0NDkyMTIsImV4cCI6MTYwNDUzNTYxMn0.j-Z_aHFVbxzmMSlLudQP7JGggo113ou4teDaDp9O7TE"
  }
  ```

</details>

## Users

<details>

  <summary>GET /users</summary>

  Fetch all users
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@gmail.com"
      },
      {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane@gmail.com"
      },
      {
        "id": 3,
        "first_name": "Jimmy",
        "last_name": "Doe",
        "email": "jimmy@gmail.com"
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /users/:id</summary>

  Fetch a user by ID
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "password": "test",
      "email": "john@gmail.com",
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47"
    }
  }
  ```

</details>

<details>

  <summary>PUT /users/:id</summary>

  Edit a user

  Expected Request Body:

  ```jSON
  {
    "first_name": "Joe"
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: User with ID: 1 updated." }
  ```

</details>

<details>

  <summary>DELETE /users/:id</summary>

  Delete a user
  
  Response:

  ```JSON
  { "message": "SUCCESS: User with ID: 1 deleted." }
  ```

</details>

## Topics

<details>

  <summary>GET /topics</summary>

  Fetch all topics
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "title": "Stand Up",
        "frequency": "Daily",
        "join_code": "K6C8XY",
        "leader_id": 1,
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      },
      {
        "id": 2,
        "title": "Engineering All-Hands",
        "frequency": "Once",
        "join_code": "Y9H3LQ",
        "leader_id": 2,
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      },
      {
        "id": 3,
        "title": "Interview",
        "frequency": "Once",
        "join_code": "L9M4DP",
        "leader_id": 1,
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /topics/:id</summary>

  Fetch a topic by ID
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "title": "Stand Up",
      "frequency": "Daily",
      "join_code": "K6C8XY",
      "leader_id": 1,
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47"
    }
  }
  ```

</details>

<details>

  <summary>GET /topics/leader/:id</summary>

  Fetch all topics by a leader ID
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "title": "Stand Up",
        "frequency": "Daily",
        "join_code": "K6C8XY",
        "leader_id": 1,
        "first_name": "John",
        "last_name": "Doe"
      },
      {
        "id": 3,
        "title": "Interview",
        "frequency": "Once",
        "join_code": "L9M4DP",
        "leader_id": 1,
        "first_name": "John",
        "last_name": "Doe"
      }
    ]
  }
  ```

</details>

<details>

  <summary>POST /topics</summary>

  Create a new topic

  Expected Request Body:

  ```JSON
  {
    "title": "Stakeholder Meeting",
    "frequency": "Weekly",
    "join_code": "P8FG6K",
    "leader_id": 2
  }
  ```
  
  Response:

  ```JSON
  {
    "message": "SUCCESS: Topic with ID: 1 created."
  }
  ```

</details>

<details>

  <summary>PUT /topics/:id</summary>

  Edit a topic

  Expected Request Body:

  ```JSON
  {
    "title": "Stakeholder Meeting",
    "frequency": "Monthly",
    "join_code": "P8FG6K",
    "leader_id": 2
  }
  ```
  
  Response:

  ```JSON
  {
    "message": "SUCCESS: Topic with ID: 1 updated."
  }
  ```

</details>

<details>

  <summary>DELETE /topics/:id</summary>

  Delete a topic
  
  Response:

  ```JSON
  { "message": "SUCCESS: Topic with ID: 4 deleted." }
  ```

</details>

## Topic Members

<details>

  <summary>GET /topic-members</summary>

  Fetch all topic members
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "topic_id": 1,
        "user_id": 2,
        "role": "admin",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      },
      {
        "id": 2,
        "topic_id": 1,
        "user_id": 3,
        "role": "user",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /topic-members/members/:id</summary>

  Fetch a topic member by id
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "topic_id": 1,
      "user_id": 2,
      "role": "admin",
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47"
    }
  }
  ```

</details>

<details>

  <summary>GET /topic-members/:id</summary>

  Fetch all topic members by a topic id
  
  Response:

  ```JSON
  {
    "data": [
      {
        "topic_id": 1,
        "user_id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane@gmail.com",
        "role": "admin"
      },
      {
        "topic_id": 1,
        "user_id": 3,
        "first_name": "Jimmy",
        "last_name": "Doe",
        "email": "jimmy@gmail.com",
        "role": "user"
      }
    ]
  }
  ```

</details>

<details>

  <summary>POST /topic-members</summary>

  Creates a new topic-member

  Expected Request Body:

  ```JSON
  {
    "topic_id": 1,
    "user_id": 2,
    "role": "user"
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Topic Member with ID: 1 created." }
  ```

</details>

<details>

  <summary>PUT /topic-members/:id</summary>

  Edit a topic member. Can be used to change member roles/privileges

  Expected Request Body:

  ```JSON
  {
    "topic_id": 1,
    "user_id": 2,
    "role": "admin"
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Topic with ID: 1 updated." }
  ```

</details>

<details>

  <summary>DELETE /topic-members/:id</summary>

  Delete a topic member. Can be used to remove a user from a topic
  
  Response:

  ```JSON
  { "message": "SUCCESS: Topic Member with ID: 1 deleted." }
  ```

</details>

## Surveys

<details>

  <summary>GET /surveys</summary>

  Fetch all surveys
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "topic_id": 1,
        "context": "Product Leadership",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      },
      {
        "id": 2,
        "topic_id": 2,
        "context": "Product Leadership",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /surveys/:id</summary>

  Fetch a survey by ID
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "topic_id": 1,
      "context": "Product Leadership",
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47"
    },
  }
  ```

</details>

<details>

  <summary>GET /surveys/topic/:id</summary>

  Fetch all surveys by a topic ID
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "title": "Stand Up",
        "frequency": "Daily",
        "join_code": "K6C8XY",
        "leader_id": 1,
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "context": "Product Leadership"
      },
      {
        "id": 3,
        "title": "Stand Up",
        "frequency": "Daily",
        "join_code": "K6C8XY",
        "leader_id": 1,
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "context": "Design Leadership"
      }
    ]
  }
  ```

</details>

<details>

  <summary>POST /surveys</summary>

  Create a new survey

  Expected Request Body:

  ```JSON
  {
    "topic_id": 2,
    "context": "Engineering Leadership"
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Survey with ID: 1 created." }
  ```

</details>

<details>

  <summary>PUT /surveys/:id</summary>

  Edit a survey

  Expected Request Body:

  ```JSON
  {
    "topic_id": 2,
    "context": "Design Leadership"
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Survey with ID: 1 updated." }
  ```

</details>

<details>

  <summary>DELETE /surveys/:id</summary>

  Delete a survey
  
  Response:

  ```JSON
  { "message": "SUCCESS: Survey with ID: 1 deleted." }
  ```

</details>

## Questions

<details>

  <summary>GET /questions</summary>

  Fetch all questions
  
  Response:

  ```JSON
  {
    "data": [
      {
          "id": 1,
          "topic_id": 1,
          "type": "context",
          "style": "text",
          "question": "What is our current priority?",
          "default": 1,
          "created_at": "2020-11-03 23:33:47",
          "updated_at": "2020-11-03 23:33:47"
      },
      {
          "id": 2,
          "topic_id": 1,
          "type": "request",
          "style": "text",
          "question": "Do you have any blockers?",
          "default": 1,
          "created_at": "2020-11-03 23:33:47",
          "updated_at": "2020-11-03 23:33:47"
      },
    ]
  }
  ```

</details>

<details>

  <summary>GET /questions/:id</summary>

  Fetch a question by id
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "topic_id": 1,
      "type": "context",
      "style": "text",
      "question": "What is our current priority?",
      "default": 1,
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47"
    }
  }
  ```

</details>

<details>

  <summary>GET /questions/topic/:id</summary>

  Fetch all questions by a topic id
  
  Response:

  ```JSON
  {
    "data": [
      {
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "What is our current priority?",
        "default": 1
      }
      {
        "topic_id": 1,
        "type": "request",
        "style": "text",
        "question": "What are you working on?",
        "default": 1
      },
      {
        "topic_id": 1,
        "type": "request",
        "style": "text",
        "question": "What will you work on?",
        "default": 1
      },
      {
        "topic_id": 1,
        "type": "request",
        "style": "text",
        "question": "Do you have any blockers?",
        "default": 1
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /questions/topic/:id/default</summary>

  Fetch all default questions by a topic id. Default questions are preset when creating a topic and will be initialized with every new survey. Changing default questions will cause all new surveys to be created with the newly selected questions.
  
  Response:

  ```JSON
  {
    "data": [
      {
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "What is our current priority?",
        "default": 1
      }
      {
        "topic_id": 1,
        "type": "request",
        "style": "text",
        "question": "What are you working on?",
        "default": 1
      },
      {
        "topic_id": 1,
        "type": "request",
        "style": "text",
        "question": "What will you work on?",
        "default": 1
      },
      {
        "topic_id": 1,
        "type": "request",
        "style": "text",
        "question": "Do you have any blockers?",
        "default": 1
      }
    ]
  }
  ```

</details>

<details>

  <summary>POST /questions</summary>

  Create a new question

  Expected Request Body:

  ```JSON
  {
    "topic_id": 1,
    "type": "request",
    "style": "rating",
    "question": "How are you feeling after this week?"
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Question with ID: 1 created." }
  ```

</details>

<details>

  <summary>PUT /questions/:id</summary>

  Edit a question

  Expected Request Body:

  ```JSON
  {
    "style": "text",
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Question with ID: 1 updated." }
  ```

</details>

<details>

  <summary>DELETE /questions/:id</summary>

  Delete a question
  
  Response:

  ```JSON
  { "message": "SUCCESS: Question with ID: 1 deleted." }
  ```

</details>

## Survey Questions

<details>

  <summary>GET /survey-questions</summary>

  Get all survey questions
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "survey_id": 1,
        "question_id": 1,
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "What is our current priority?",
        "default": 1
      },
      {
        "id": 2,
        "survey_id": 1,
        "question_id": 6,
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "type": "request",
        "style": "text",
        "question": "Do you have any blockers?",
        "default": 1
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /survey-questions/:id</summary>

  Get a survey question by id
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "topic_id": 1,
      "type": "context",
      "style": "text",
      "question": "What is our current priority?",
      "default": 1,
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47"
    }
  }
  ```

</details>

<details>

  <summary>GET /survey-questions/survey/:id</summary>

  Get a survey question by a survey id
  
  Response:

  ```JSON
  {
    "data": [
      {
        "topic_id": 1,
        "survey_id": 1,
        "question_id": 1,
        "type": "context",
        "style": "text",
        "question": "What is our current priority?",
        "default": 1
      },
      {
        "topic_id": 1,
        "survey_id": 1,
        "question_id": 2,
        "type": "context",
        "style": "text",
        "question": "When is the next deadline?",
        "default": 1
      },
    ]
  }
  ```

</details>

<details>

  <summary>POST /survey-questions</summary>

  Create a new survey question. The database will create the question first if it noes not yet exist in the database. If no `question_id` is given, the question will first be created. The request handler will attempt to match the request question with the correct question in the database before creating a new question. **Only the `survey_id` and `question_id` are posted to the survey-questions table. The rest of the request object is used in case a new question needs to be created.**

  Expected Request Body:

  ```JSON
  {
    "survey_id": 1,
    "question_id": 1,
    "topic_id": 1,
    "type": "request",
    "style": "text",
    "question": "What is our current priority?"
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Survey Question with ID: 1 created." }
  ```

</details>

<details>

  <summary>PUT /survey-questions/:id</summary>

  Edit a survey question

  Expected Request Body:

  ```JSON
  {
    "survey_id": 1,
    "question_id": 2
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Survey Question with ID: 1 updated." }
  ```

</details>

<details>

  <summary>DELETE /survey-questions/:id</summary>

  Delete a survey question
  
  Response:

  ```JSON
  { "message": "SUCCESS: Survey Question with ID: 1 deleted." }
  ```

</details>

## Responses

<details>

  <summary>GET /responses</summary>

  Fetch all responses. The response JSON object will return the response, the question, and the user that responded.
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "question_id": 1,
        "user_id": 1,
        "survey_id": 1,
        "response": "Finishing the release 1 deliverables.",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "What is our current priority?",
        "default": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@gmail.com"
      },
      {
        "id": 2,
        "question_id": 2,
        "user_id": 1,
        "survey_id": 1,
        "response": "Friday of this week.",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "When is the next deadline?",
        "default": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@gmail.com"
      },
      {
        "id": 3,
        "question_id": 3,
        "user_id": 1,
        "survey_id": 1,
        "response": "We added a new member to our team!",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "Are there any announcements for the team?",
        "default": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@gmail.com"
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /responses/:id</summary>

  Get a response by id
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "question_id": 1,
      "user_id": 1,
      "survey_id": 1,
      "response": "Finishing the release 1 deliverables.",
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47",
      "topic_id": 1,
      "type": "context",
      "style": "text",
      "question": "What is our current priority?",
      "default": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@gmail.com"
    }
  }
  ```

</details>

<details>

  <summary>GET /responses/survey/:id</summary>

  Get all responses by a survey id
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "question_id": 1,
        "user_id": 1,
        "survey_id": 1,
        "response": "Finishing the release 1 deliverables.",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47",
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "What is our current priority?",
        "default": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@gmail.com"
      },
      {
        "id": 1,
        "question_id": 1,
        "user_id": 2,
        "survey_id": 1,
        "response": "Finishing the back end API.",
        "created_at": "2020-11-04 13:53:17",
        "updated_at": "2020-11-04 13:53:17",
        "topic_id": 1,
        "type": "context",
        "style": "text",
        "question": "What is our current priority?",
        "default": 1,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane@gmail.com"
      },
    ]
  }
  ```

</details>

<details>

  <summary>POST /responses</summary>

  Create a new response. The `question` property is used to locate the `question_id` in the event that one is not supplied. It **will not be posted into the responses table.**

  Expected Request Body:

  ```JSON
  {
    "question_id": 1,
    "question": "What is the current priority?",
    "user_id": 2,
    "survey_id": 1,
    "response": "Finishing up the back end API."
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Response with ID: 1 created."}
  ```

</details>

<details>

  <summary>PUT /responses/:id</summary>

  Edit a response

  Expected Request Body:

  ```JSON
  {
    "question_id": 1,
    "user_id": 2,
    "survey_id": 1,
    "response": "Finishing up the UI components."
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Response with ID: 1 updated."}
  ```

</details>

<details>

  <summary>DELETE /responses/:id</summary>

  Delete a response
  
  Response:

  ```JSON
  { "message": "SUCCESS: Response with ID: 1 deleted."}
  ```

</details>

## Comments

<details>

  <summary>GET /comments</summary>

  Fetch all comments
  
  Response:

  ```JSON
  {
    "data": [
      {
        "id": 1,
        "user_id": 1,
        "response_id": 5,
        "comment": "Are you following the most recent wire frames?",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      },
      {
        "id": 2,
        "user_id": 2,
        "response_id": 5,
        "comment": "Yes, the ones delivered on Monday?",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      },
      {
        "id": 3,
        "user_id": 2,
        "response_id": 5,
        "comment": "I got them from Jimmy",
        "created_at": "2020-11-03 23:33:47",
        "updated_at": "2020-11-03 23:33:47"
      }
    ]
  }
  ```

</details>

<details>

  <summary>GET /comments/:id</summary>

  Fetch a comment by id
  
  Response:

  ```JSON
  {
    "data": {
      "id": 1,
      "user_id": 1,
      "response_id": 5,
      "comment": "Are you following the most recent wire frames?",
      "created_at": "2020-11-03 23:33:47",
      "updated_at": "2020-11-03 23:33:47"
    }
  }
  ```

</details>

<details>

  <summary>POST /comments</summary>

  Create a new comment

  Expected Request Body:

  ```JSON
  {
    "user_id": 1,
    "response_id": 5,
    "comment": "Awesome! Keep up the great work.",
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Comment with ID: 1 created."}
  ```

</details>

<details>

  <summary>PUT /comments/:id</summary>

  Edit a comment

  Expected Request Body:

  ```JSON
  {
    "user_id": 1,
    "response_id": 5,
    "comment": "Do you have any questions?",
  }
  ```
  
  Response:

  ```JSON
  { "message": "SUCCESS: Comment with ID: 1 updated."}
  ```

</details>

<details>

  <summary>DELETE /comments/:id</summary>

  Delete a comment
  
  Response:

  ```JSON
  { "message": "SUCCESS: Comment with ID: 1 deleted."}
  ```

</details>