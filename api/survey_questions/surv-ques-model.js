const db = require("../../data/dbConfig");

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
    .orderBy("survey_questions.question_id")
}

function findBySurveyID(surveyID) {
  return db("surveys")
    .where("surveys.id", surveyID)
    .join("survey_questions", "survey_questions.survey_id", "surveys.id")
    .join("questions", "questions.id", "survey_questions.question_id")
    .select("questions.topic_id", "survey_questions.survey_id", "survey_questions.question_id",  "questions.type", "questions.style", "questions.question", "questions.default")
    .orderBy("survey_questions.id")
}

// when a response is created for an updated or new question, this handler will use the question itself to locate the question_id
function findByQuestion(question, style, topicID) {
  return db("topics")
    .where("topics.id", topicID)
    .join("questions", "questions.topic_id", "topics.id")
    .select("questions.type", "questions.style", "questions.question", "questions.id")
    .orderBy("questions.id")
    .then(questions => {  
      return questions.filter(q => q.question === question && q.style === style)
    })
    .catch(err =>  console.log("---FIND QUESTION BY ID---", err))
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
  findByQuestion,
  add,
  edit,
  remove,
}