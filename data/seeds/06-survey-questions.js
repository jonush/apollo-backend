exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("survey_questions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("survey_questions").insert([
        {
          survey_id: 1,
          question_id: 1,
        },
        {
          survey_id: 1,
          question_id: 2,
        },
        {
          survey_id: 1,
          question_id: 3,
        },
        {
          survey_id: 1,
          question_id: 4,
        },
        {
          survey_id: 1,
          question_id: 5,
        },
        {
          survey_id: 1,
          question_id: 6,
        },
        {
          survey_id: 2,
          question_id: 7,
        },
        {
          survey_id: 2,
          question_id: 8,
        },
        {
          survey_id: 2,
          question_id: 9,
        },
        {
          survey_id: 2,
          question_id: 10,
        },
        {
          survey_id: 2,
          question_id: 11,
        },
        {
          survey_id: 2,
          question_id: 12,
        },
      ]);
    });
};
