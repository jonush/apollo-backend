# Apollo API

The Base URL: [https://apollo-be-api.herokuapp.com/]([https:google.com](https://apollo-be-api.herokuapp.com))

The Database Design Schema: [DBDesigner](https://dbdesigner.page.link/msEfnXD14kH4NtQh9)

PostMan Collection of API Endpoints: [Endpoints](https://www.getpostman.com/collections/0cede12c1624dfc55e27)

The API includes various endpoints to handle all features of the Apollo application. The API handles user account creation and offers different account roles for control over Apollo. The back end server was built using Node, Knex, and express. Authentication was handled using JSON Web Tokens. The deployed application can be found [here](https://google.com).

<hr>

## Authentication

The Apollo API uses JWT for authentication. After creating an account and logging in with credentials, a JWT will be generated.

<details>

  <summary>POST [Creates a new user for Apollo]</summary>

  `POST` to `BASE_URL/register`

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
  {
    "data": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "password": "$2a$08$qmrYAzgog33SwlnMOYUmOei28dFYW81qoDJsBRaUDFWKifWvakqB.",
      "email": "john@gmail.com",
      "created_at": "2020-11-04 00:19:48",
      "updated_at": "2020-11-04 00:19:48"
    }
  }
  ```

</details>

<details>

  <summary>POST [Log in to Apollo with verified credentials]</summary>

  `POST` to `BASE_URL/login`

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
    "data": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@email.com",
      "password": "$2a$08$qmrYAzgog33SwlnMOYUmOei28dFYW81qoDJsBRaUDFWKifWvakqB."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJlbWFpbCI6ImpvZUBnbWFpbC5jb20iLCJpYXQiOjE2MDQ0NDkyMTIsImV4cCI6MTYwNDUzNTYxMn0.j-Z_aHFVbxzmMSlLudQP7JGggo113ou4teDaDp9O7TE"
  }
  ```

</details>

<hr>

## Topics

<details>

  <summary>GET [Fetch all topics]</summary>

  `GET` `BASE_URL/topics`
  
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

  <summary>GET [Fetch a topic by ID]</summary>

  `GET` `BASE_URL/topics/:id`
  
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

  <summary>GET [Fetch all topics by a leader ID]</summary>

  `GET` `BASE_URL/topics/leader/:id`
  
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

  <summary>POST [Create a new topic]</summary>

  `POST` `BASE_URL/topics`

  Expected Request Body:

  ```JSON
  {
    "title": "Stakeholder Meeting",
    "frequency": "Weekly",
    "join_code": "P8FG6K",  // auto-generated on the front end
    "leader_id": 2
  }
  ```
  
  Response:

  ```JSON
  {
    "data": {
      "id": 4,
      "title": "Stakeholder Meeting",
      "frequency": "Weekly",
      "join_code": "P8FG6K",
      "leader_id": 4,
      "created_at": "2020-11-04 00:33:57",
      "updated_at": "2020-11-04 00:33:57"
    }
  }
  ```

</details>

<details>

  <summary>PUT [Edit a topic]</summary>

  `PUT` `BASE_URL/topics/:id`

  Expected Request Body:

  ```JSON
  {
    "title": "Stakeholder Meeting",
    "frequency": "Monthly",
    "join_code": "P8FG6K",  // auto-generated on the front end
    "leader_id": 2
  }
  ```
  
  Response:

  ```JSON
  {
    "data": {
      "id": 4,
      "title": "Stakeholder Meeting",
      "frequency": "Monthly",
      "join_code": "P8FG6K",
      "leader_id": 4,
      "created_at": "2020-11-04 00:33:57",
      "updated_at": "2020-11-04 00:37:32"
    }
  }
  ```

</details>

<details>

  <summary>DELETE [Delete a topic]</summary>

  `DELETE` `BASE_URL/topics/:id`
  
  Response:

  ```JSON
  The topic with ID: 4 was successfully deleted.
  ```

</details>

<hr>

## Topic Members

<details>

  <summary>GET [Fetch all topic members]</summary>

  `GET` `BASE_URL/topic-members`
  
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

  <summary>GET [Fetch a topic member by id]</summary>

  `GET` `BASE_URL/topic-members/members/:id`
  
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

  <summary>GET [Fetch all topic members by a topic id]</summary>

  `GET` `BASE_URL/topic-members/:id`
  
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

  <summary>POST [Create a new topic member]</summary>

  `POST` `BASE_URL/topic-members`

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
  {
    "data": {
      "id": 2,
      "topic_id": 1,
      "user_id": 2,
      "role": "user",
      "created_at": "2020-11-04 01:02:26",
      "updated_at": "2020-11-04 01:02:26"
    }
  }
  ```

</details>

<details>

  <summary>PUT [Edit a topic member]</summary>

  `PUT` `BASE_URL/topic-members/:id`

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
  {
    "data": {
      "id": 2,
      "topic_id": 1,
      "user_id": 2,
      "role": "admin",
      "created_at": "2020-11-04 01:02:26",
      "updated_at": "2020-11-04 01:02:26"
    }
  }
  ```

</details>

<details>

  <summary>DELETE [Delete a topic member]</summary>

  `DELETE` `BASE_URL/topic-members/:id`
  
  Response:

  ```JSON
  The topic member with ID: 2 was removed.
  ```

</details>

<hr>

## Surveys

<details>

  <summary>GET [Fetch all surveys]</summary>

  `GET` `BASE_URL/surveys`
  
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

  <summary>GET [Fetch a survey by ID]</summary>

  `GET` `BASE_URL/surveys/:id`
  
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

  <summary>GET [Fetch all surveys by a topic ID]</summary>

  `GET` `BASE_URL/surveys/topic/:id`
  
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

  <summary>POST [Create a new survey]</summary>

  `POST` `BASE_URL/surveys`

  Expected Request Body:

  ```JSON
  {
    "topic_id": 2,
    "context": "Engineering Leadership"
  }
  ```
  
  Response:

  ```JSON
  {
    "data": {
      "id": 4,
      "topic_id": 2,
      "context": "Engineering Leadership",
      "created_at": "2020-11-04 01:08:46",
      "updated_at": "2020-11-04 01:08:46"
    }
  }
  ```

</details>

<details>

  <summary>PUT [Edit a survey]</summary>

  `PUT` `BASE_URL/surveys/:id`

  Expected Request Body:

  ```JSON
  {
    "topic_id": 2,
    "context": "Design Leadership"
  }
  ```
  
  Response:

  ```JSON
  {
    "data": {
      "id": 4,
      "topic_id": 2,
      "context": "Design Leadership",
      "created_at": "2020-11-04 01:08:46",
      "updated_at": "2020-11-04 01:18:18"
    }
  }
  ```

</details>

<details>

  <summary>DELETE [Delete a survey]</summary>

  `DELETE` `BASE_URL/surveys/:id`
  
  Response:

  ```JSON
  The survey with ID: 4 was successfully deleted.
  ```

</details>

<hr>

## Questions

<details>

  <summary>GET [Fetch all questions]</summary>

  `GET` `BASE_URL/questions`
  
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

<hr>