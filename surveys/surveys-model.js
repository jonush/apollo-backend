const db = require("../data/dbConfig");

function find() {
  return db("survey_requests")
    .select("*")
    .orderBy("survey_requests.id")
}

function findByID(id) {
  return db("survey_requests")
    .where("survey_requests.id", id)
    .first()
    .select("*")
    .orderBy("id")
}

function findByTopicID(topicID) {
  return db("topics")
    .where("topics.id", topicID)
    .join("survey_requests", "survey_requests.topic_id", "topics.id")
    .select("*")
    .orderBy("survey_requests.id")
}

function add(survey) {
  return db("survey_requests")
    .insert(survey, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD SURVEY REQUEST ERROR---", err))
}

function edit(survey, id) {
  return db("survey_requests")
    .where({ id })
    .update(survey)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT SURVEY REQUEST ERROR---", err))
}

function remove(id) {
  return db("survey_requests")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findByID,
  findByTopicID,
  add,
  edit,
  remove,
}