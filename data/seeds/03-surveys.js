exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("surveys")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("surveys").insert([
        {
          topic_id: 1,
          context: "Product Leadership",
        },
        {
          topic_id: 2,
          context: "Product Leadership",
        },
        {
          topic_id: 1,
          context: "Design Leadership",
        },
      ]);
    });
};
