const db = require("../../data/dbConfig")

function find() {
  return db("topics")
    .select("*")
    .orderBy("topics.id")
}

function findByID(id) {
  return db("topics")
    .where("topics.id", id)
    .first()
    .select("*")
}

function findByLeaderID(leaderID) {
  return db("users")
    .where("users.id", leaderID)
    .join("topics", "topics.leader_id", "users.id")
    .select("topics.id", "topics.title", "topics.frequency", "topics.join_code", "topics.leader_id", "users.first_name", "users.last_name")
    .orderBy("topics.id")
}

function add(topic) {
  return db("topics")
    .insert(topic, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD TOPIC ERROR---", err))
}

function edit(topic, id) {
  return db("topics")
    .where({ id })
    .update(topic)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT TOPIC ERROR---", err))
}

function remove(id) {
  return db("topics")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findByID,
  findByLeaderID,
  add,
  edit,
  remove,
}