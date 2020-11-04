exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "John",
          last_name: "Doe",
          password: "test",
          email: "john@gmail.com",
        },
        {
          first_name: "Jane",
          last_name: "Doe",
          password: "test",
          email: "jane@gmail.com",
        },
        {
          first_name: "Jimmy",
          last_name: "Doe",
          password: "test",
          email: "jimmy@gmail.com",
        },
      ]);
    });
};
