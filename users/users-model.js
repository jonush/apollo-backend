const db = require("../data/dbConfig");

function find() {
  return db("users")
    .select("id", "first_name", "last_name", "email")
    .orderBy("id");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select("id", "first_name", "last_name", "email", "password")
    .orderBy("id");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => findById(ids[0]))
    .catch(err => console.log("---ADD USER ERROR---", err))
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};
