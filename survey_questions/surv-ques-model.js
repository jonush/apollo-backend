const db = require("../data/dbConfig");

function find() {
  return db("survey_questions")
    .join("questions", "questions.id", "survey_questions.question_id")
    .select("*")
    .orderBy("survey_questions.id")
}

function findByID(id) {
  return db("survey_questions")
    .where("survey_questions.id", id)
    .join("questions", "questions.id", "survey_questions.question_id")
    .first()
    .select("*")
    .orderBy("id")
}

function findBySurveyID(surveyID) {
  return db("surveys")
    .where("surveys.id", surveyID)
    .join("survey_questions", "survey_questions.survey_id", "surveys.id")
    .join("questions", "questions.id", "survey_questions.question_id")
    .select("questions.topic_id", "survey_questions.survey_id", "survey_questions.question_id",  "questions.type", "questions.style", "questions.question", "questions.default")
    .orderBy("survey_questions.id")
}

function add(survey_question) {
  return db("survey_questions")
    .insert(survey_question, "id")
    .then(ids => {
      return findByID(ids[0])
    })
    .catch(err => console.log("---ADD SURVEY QUESTION ERROR---", err))
}

function edit(survey_question, id) {
  return db("survey_questions")
    .where({ id })
    .update(survey_question)
    .then(() => {
      return findByID(id)
    })
    .catch(err => console.log("---EDIT SURVEY QUESTION ERROR---", err))
}

function remove(id) {
  return db("survey_questions")
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