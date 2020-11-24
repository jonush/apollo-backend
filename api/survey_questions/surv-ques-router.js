const router = require("express").Router();
const restricted = require('../../auth/auth-middleware');
const SurveyQuestions = require("./surv-ques-model");
const Questions = require("../questions/questions-model");

// GET all survey questions
router.get("/", restricted, (req, res) => {
  SurveyQuestions.find()
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(err => {
      console.log("GET /survey-questions/", err);
      res.status(500).json({ error: err.message });
    })
});

// GET a survey question by id
router.get("/:id", restricted, (req,res) => {
  const { id } = req.params;

  SurveyQuestions.findByID(id)
    .then(question => {
      if(question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ error: `Unable to find survey question with id: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /survey-questions/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// GET all survey questions by a survey id
router.get("/survey/:id", restricted, (req,res) => {
  const { id } = req.params;

  SurveyQuestions.findBySurveyID(id)
    .then(questions => {
      if(questions) {
        res.status(200).json(questions);
      } else {
        res.status(404).json({ error: `Unable to find survey questions from Topic ID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /survey-questions/survey/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// POST a new survey question
router.post("/", restricted, (req, res) => {
  let surveyQuestion = req.body;
  
  // if the question does not exist yet
  if(surveyQuestion.question_id === null || surveyQuestion.question_id === undefined) {
    // first, create the new question
    Questions.add({question: surveyQuestion.question, style: surveyQuestion.style, type: surveyQuestion.type, topic_id: surveyQuestion.topic_id})
      .then(newQuestion => {
        // then, create the new survey question
        SurveyQuestions.add({survey_id: surveyQuestion.survey_id, question_id: newQuestion.id })
          .then(newSurveyQuestion => {
            res.status(201).json({ message: `SUCCESS: Survey Question with ID: ${newSurveyQuestion.id} created.` })
          })
          .catch(err => {
            console.log("POST /survey-questions", err);
            res.status(500).json({ error: "Unable to creat the survey question. Please try again." });
          })
      })
      .catch(err => {
        console.log("POST /survey-questions", err);
        res.status(500).json({ error: "There was an error creating the new question. Please try again." })
      })
  } else {
    // fetch the existing question by ID
    Questions.findByID(surveyQuestion.question_id)
      .then(q => {
        // the existing question has been changed
        if(q.question !== surveyQuestion.question) {
          Questions.add({question: surveyQuestion.question, style: surveyQuestion.style, type: surveyQuestion.type, topic_id: surveyQuestion.topic_id})
            .then(newQuestion => {
              // then, create the new survey question
              SurveyQuestions.add({survey_id: surveyQuestion.survey_id, question_id: newQuestion.id })
                .then(newSurveyQuestion => {
                  res.status(201).json({ message: `SUCCESS: Survey Question with ID: ${newSurveyQuestion.id} created.` })
                })
                .catch(err => {
                  console.log("POST /survey-questions", err);
                  res.status(500).json({ error: "Unable to creat the survey question. Please try again." });
                })
            })
            .catch(err => {
              console.log("POST /survey-questions", err);
              res.status(500).json({ error: "There was an error creating the new question. Please try again." })
            })
        } else { 
          // the existing question is not changed and can be made into a survey question
          SurveyQuestions.add({survey_id: surveyQuestion.survey_id, question_id: surveyQuestion.question_id })
            .then(newSurveyQuestion => {
              res.status(201).json({ message: `SUCCESS: Survey Question with ID: ${newSurveyQuestion.id} created.` })
            })
            .catch(err => {
              console.log("POST /survey-questions", err);
              res.status(500).json({ error: "Unable to creat the survey question. Please try again." });
            })
        }
      })
      .catch(err => {
        console.log("POST /survey-questions", err);
        res.status(500).json({ error: "Unable to create the survey question because there was an error with the question." })
      })
  }
});

// EDIT a survey question
router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  SurveyQuestions.findByID(id)
    .then(question => {
      if(question) {
        SurveyQuestions.edit(update, id)
          .then(updatedQuestion => {
            res.status(200).json({ message: `SUCCESS: Survey Question with ID: ${updatedQuestion.id} updated.` });
          })
          .catch(err => {
            console.log('PUT /survey-questions/:id', err);
            res.status(400).json({ error: "Unable to update the survey question. Please try again." });
          })
      } else {
        res.status(404).json({ error: `Unable to find a survey question with id: ${id}` });
      }
    })
    .catch(err => {
      console.log('PUT /survey-questions/:id', err);
      res.status(500).json({ error: "Error occurred while updating the survey question", err });
    })
});

// DELETE a survey question
router.delete("/:id", restricted, (req, res) => {
  const  { id } = req.params;

  SurveyQuestions.findByID(id)
    .then(question => {
      console.log(question);
      SurveyQuestions.remove(question.id)
        .then(removed => {
          console.log(removed);
          res.status(200).json({ message: `SUCCESS: Survey Question with ID: ${id} deleted.` });
        })
        .catch(err => {
          console.log("DELETE /survey-questions/:id", err);
          res.status(500).json({ error: "There was an error when deleting the survey question. Please try again." });
        })
    })
    .catch(err => {
      console.log("DELETE /survey-questions/:id", err);
      res.status(400).json({ error: `The survey question with ID: ${id} could not be found.` });
    })
});

module.exports = router;