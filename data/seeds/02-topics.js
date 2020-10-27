
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('topics').del()
    .then(function () {
      // Inserts seed entries
      return knex('topics').insert([
        {
          title: "Stand Up",
          frequency: "Daily",
          join_code: "K6C8XY",
          leader_id: 1,
        }, 
        {
          title: "Engineering All-Hands",
          frequency: "Once",
          join_code: "Y9H3LQ",
          leader_id: 2,
        },
        {
          title: "Interview",
          frequency: "Once",
          join_code: "L9M4DP",
          leader_id: 1,
        }, 
      ]);
    });
};
