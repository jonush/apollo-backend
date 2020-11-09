const router = require("express").Router();
const restricted = require('../../auth/auth-middleware');
const SurveyQuestions = require("./surv-ques-model");
const Questions = require("../questions/questions-model");

// GET all survey questions
router.get("/", restricted, (req, res) => {
  SurveyQuestions.find()
    .then(questions => {
      res.status(200).json({ data: questions })
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
        res.status(200).json({ data: question });
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
        res.status(200).json({ data: questions });
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
  let surveyQuestion = req.body.sq;
  let newQuestion = req.body.question;
  
  // check if the survey question exists in the question table
  Questions.findByID(surveyQuestion.question_id)
    // then create the survey question using the returned question_id from the response
    .then(() => {
      if(surveyQuestion.survey_id === "") {
        res.status(400).json({ error: "Missing survey id" });
      } else {
        SurveyQuestions.add(surveyQuestion)
        .then(newQuestion => {
          res.status(201).json({ message: `SUCCESS: Survey Question with ID: ${newQuestion.id} created.` })
        })
        .catch(err => {
          console.log("POST /survey-questions", err);
          res.status(500).json({ error: "Unable to creat the survey question. Please try again." });
        })
      }
    })
    // if not, create the question
    .catch(() => {
      if(newQuestion.question) {
        Questions.add(newQuestion)
          .then(q => {
            SurveyQuestions.add({ survey_id: surveyQuestion.survey_id, question_id: q.id })
              .then(newQuestion => {
                res.status(201).json({ message: `SUCCESS: Survey Question with ID: ${newQuestion.id} created.` });
              })
              .catch(err => {
                console.log("POST /survey-questions", err);
                res.status(500).json({ error: "Unable to creat the survey question. Please try again." });
              })
          })
          .catch(err => {
            console.log("POST /survey-questions", err);
            res.status(500).json({ error: "There was an error creating the question. Please try again." })
          })
      } else {
        res.status(500).json({ error: "Unable to create the survey question because there was an error with the question." })
      }
    })
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