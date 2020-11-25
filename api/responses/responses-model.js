const db = require("../../data/dbConfig");

function find() {
  return db("responses")
    .join("questions", "questions.id", "responses.question_id")
    .join("users", "users.id", "responses.user_id")
    .select("responses.id", "responses.question_id", "responses.user_id", "responses.survey_id", "responses.response", "responses.created_at", "responses.updated_at", "questions.topic_id", "questions.type", "questions.style", "questions.question", "questions.default", "users.first_name", "users.last_name", "users.email")
    .orderBy("responses.id")
}

function findByID(id) {
  return db("responses")
    .where("responses.id", id)
    .join("questions", "questions.id", "responses.question_id")
    .join("users", "users.id", "responses.user_id")
    .first()
    .select("responses.id", "responses.question_id", "responses.user_id", "responses.survey_id", "responses.response", "responses.created_at", "responses.updated_at", "questions.topic_id", "questions.type", "questions.style", "questions.question", "questions.default", "users.first_name", "users.last_name", "users.email")
    .orderBy("responses.id")
}

function findBySurveyID(surveyID) {
  return db("surveys")
    .where("surveys.id", surveyID)
    .join("responses", "responses.survey_id", "surveys.id")
    .join("questions", "questions.id", "responses.question_id")
    .join("users", "users.id", "responses.user_id")
    .select("responses.id", "responses.question_id", "responses.user_id", "responses.survey_id", "responses.response", "responses.created_at", "responses.updated_at", "questions.topic_id", "questions.type", "questions.style", "questions.question", "questions.default", "users.first_name", "users.last_name", "users.email")
    .orderBy("questions.id", "asc")
}

function add(response) {
  return db("responses")
    .insert(response, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD RESPONSE ERROR---", err))
}

function edit(response, id) {
  return db("responses")
    .where({ id })
    .update(response)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT RESPONSE ERROR---", err))
}

function remove(id) {
  return db("responses")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findByID,
  findBySurveyID,
  add,
  edit,
  remove,
}