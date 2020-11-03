exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("responses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("responses").insert([
        {
          question_id: 1,
          user_id: 1,
          survey_id: 1,
          response: "Finishing the release 1 deliverables."
        },
        {
          question_id: 2,
          user_id: 1,
          survey_id: 1,
          response: "Friday of this week."
        },
        {
          question_id: 3,
          user_id: 1,
          survey_id: 1,
          response: "We added a new member to our team!"
        },
        {
          question_id: 4,
          user_id: 2,
          survey_id: 1,
          response: "The front end web application."
        },
        {
          question_id: 5,
          user_id: 2,
          survey_id: 1,
          response: "Finishing the UI components."
        },
        {
          question_id: 6,
          user_id: 2,
          survey_id: 1,
          response: "Not at the moment!"
        },
        {
          question_id: 4,
          user_id: 3,
          survey_id: 1,
          response: "Building out the back end API."
        },
        {
          question_id: 5,
          user_id: 3,
          survey_id: 1,
          response: "Testing the API endpoints."
        },
        {
          question_id: 6,
          user_id: 3,
          survey_id: 1,
          response: "Not right now."
        },
      ]);
    });
};
