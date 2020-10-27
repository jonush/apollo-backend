exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("survey_requests")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("survey_requests").insert([
        {
          topic_id: 1,
          context: "Product Leadership"
        },
        {
          topic_id: 2,
          context: "Product Leadership"
        },
        {
          topic_id: 1,
          context: "Design Leadership"
        },
      ]);
    });
};
