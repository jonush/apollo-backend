const db = require("../../data/dbConfig");

function find() {
  return db("comments")
    .select("*")
    .orderBy("comments.updated_at")
}

function findByID(id) {
  return db("comments")
    .where("comments.id", id)
    .join("responses", "responses.id", "comments.response_id")
    .join("users", "users.id", "comments.user_id")
    .first()
    .select("comments.id", "comments.response_id", "comments.comment", "comments.created_at", "comments.updated_at", "responses.survey_id", "responses.question_id", "responses.response", "comments.user_id", "users.first_name", "users.last_name", "users.email")
    .orderBy("comments.updated_at")
}

function findByResponseID(responseID) {
  return db("responses")
    .where("responses.id", responseID)
    .join("comments", "comments.response_id", "responses.id")
    .join("users", "users.id", "comments.user_id")
    .select("comments.id", "comments.response_id", "comments.comment", "comments.created_at", "comments.updated_at", "responses.survey_id", "responses.question_id", "responses.response", "comments.user_id", "users.first_name", "users.last_name", "users.email")
    .orderBy("comments.updated_at")
}

function add(comment) {
  return db("comments")
    .insert(comment, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD COMMENT ERROR---", err))
}

function edit(comment, id) {
  return db("comments")
    .where({ id })
    .update(comment)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT COMMENT ERROR---", err))
}

function remove(id) {
  return db("comments")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findByID,
  findByResponseID,
  add,
  edit,
  remove,
}