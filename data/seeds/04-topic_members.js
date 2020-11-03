exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("topic_members")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("topic_members").insert([
        {
          topic_id: 1,
          user_id: 2,
          role: "admin",
        },
        {
          topic_id: 1,
          user_id: 3,
          role: "user",
        },
        {
          topic_id: 2,
          user_id: 1,
          role: "user",
        },
        {
          topic_id: 2,
          user_id: 3,
          role: "user",
        },
      ]);
    });
};
