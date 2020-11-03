const db = require("../../data/dbConfig")

function find() {
  return db("topic_members")
    .select("*")
    .orderBy("topic_members.id")
}

function findByID(id) {
  return db("topic_members")
    .where("topic_members.id", id)
    .first()
    .select("*")
}

function findByTopic(topic_id) {
  return db("topics")
    .where("topics.id", topic_id)
    .join("topic_members", "topic_members.topic_id", "topics.id")
    .join("users", "users.id", "topic_members.user_id")
    .select("topic_id", "user_id", "users.first_name", "users.last_name", "users.email", "role")
}

function add(member) {
  return db("topic_members")
    .insert(member, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD TOPIC MEMBER ERROR---", err))
}

function edit(topic, id) {
  return db("topic_members")
    .where({ id })
    .update(topic)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT TOPIC MEMBER ERROR---", err))
}

function remove(id) {
  return db("topic_members")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findByID,
  findByTopic,
  add,
  edit,
  remove,
}