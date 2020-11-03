exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comments").insert([
        {
          user_id: 1,
          response_id: 5,
          comment: "Are you following the most recent wire frames?",
        },
        {
          user_id: 2,
          response_id: 5,
          comment: "Yes, the ones delivered on Monday?",
        },
        {
          user_id: 2,
          response_id: 5,
          comment: "I got them from Jimmy",
        },
        {
          user_id: 1,
          response_id: 6,
          comment: "Awesome! Keep up the great work.",
        },
      ]);
    });
};
