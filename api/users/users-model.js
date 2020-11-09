const db = require("../../data/dbConfig");

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

function findByID(id) {
  return db("users")
    .where("users.id", id)
    .first()
    .select("*")
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => findByID(ids[0]))
    .catch(err => console.log("---ADD USER ERROR---", err))
}

function edit(user, id) {
  return db("users")
    .where({ id })
    .update(user)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT USER ERROR---", err))
}

function remove(id) {
  return db("users")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findBy,
  findByID,
  add,
  edit,
  remove,
};
