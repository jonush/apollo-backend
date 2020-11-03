const db = require("../../data/dbConfig");

function find() {
  return db("questions")
    .select("*")
    .orderBy("questions.id")
}

function findByID(id) {
  return db("questions")
    .where("questions.id", id)
    .first()
    .select("*")
    .orderBy("questions.id")
}

function findByTopicID(topicID) {
  return db("topics")
    .where("topics.id", topicID)
    .join("questions", "questions.topic_id", "topics.id")
    .select("questions.topic_id", "questions.type", "questions.style", "questions.question", "questions.default")
    .orderBy("questions.id")
}

function findByDefault(id) {
  return db("questions")
    .where("questions.topic_id", id)
    .where("questions.default", true)
    .select("*")
    .orderBy("questions.id")
}

function add(question) {
  return db("questions")
    .insert(question, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD QUESTION ERROR---", err))
}

function edit(question, id) {
  return db("questions")
    .where({ id })
    .update(question)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT QUESTION ERROR---", err))
}

function remove(id) {
  return db("questions")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findByID,
  findByTopicID,
  findByDefault,
  add,
  edit,
  remove,
}