const db = require("../../data/dbConfig");

function find() {
  return db("surveys")
    .select("*")
    .orderBy("surveys.id")
}

function findByID(id) {
  return db("surveys")
    .where("surveys.id", id)
    .first()
    .select("*")
    .orderBy("id")
}

function findByTopicID(topicID) {
  return db("topics")
    .where("topics.id", topicID)
    .join("surveys", "surveys.topic_id", "topics.id")
    .select("*")
    .orderBy("surveys.id")
}

function add(survey) {
  return db("surveys")
    .insert(survey, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD SURVEY REQUEST ERROR---", err))
}

function edit(survey, id) {
  return db("surveys")
    .where({ id })
    .update(survey)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT SURVEY REQUEST ERROR---", err))
}

function remove(id) {
  return db("surveys")
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