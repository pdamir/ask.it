## Ask.it

This is an app build using React, Node.js with Express.js and PostgreSQL database.

## Getting started

You can view a live demo over at https://http://askit-app.herokuapp.com/

To get the app running locally:

- Clone this repo
- Create a database with the name you like, and create a .env file with the following parameters:
  DB_URL
  DB_PORT
  DB_USER
  DB_PASSWORD
  DB_NAME
  SERVER_KEY
  TOKEN_LIFE
- To run the backend go into the root of the repository folder and
- `npm install` to install all required dependencies
- `knex migrate:latest` to trigger the migration of initial DB tables
- `knex seed:run` to trigger seeding of test data
- `npm start` to start the local server (this project uses create-react-app)
- To run the frontend (React)
- `cd client && npm install` to install all required frontend dependencies
- `npm start` to start the local server (this project uses create-react-app)

Express.js will use port 3000 and React uses port 8000 instead of standard React's port 3000 to prevent conflicts with backend. You can configure React port in `package.json`

## Functionality overview

Ask.it is an app that allows users to create questions and answers, and also give feedback (like or disliked) to content from other users.

**General functionality:**

- Authenticate users via JWT (login/register pages + logout button on navigation bar)
- View list of latest questions with the load more functionality
- View list of top 5 questions with most likes (hot questions)
- View list of top 5 users with most given answers
- Add and view single question
- View list of answers for a single question with load more functionality
- Add an answer to a single question
- Give feedback (Like and Dislike) a question or answer
- Update your profile
- Delete profile
- Favorite articles
