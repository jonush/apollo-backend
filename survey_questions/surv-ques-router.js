const router = require("express").Router();
const restricted = require('../auth/auth-middleware');
const SurveyQuestions = require("../survey_questions/surv-ques-model");

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
  let question = req.body;

  if(req.body.survey_id === "" || req.body.question_id === "") {
    res.status(400).json({ error: "Missing survey id or question id" });
  } else {
    SurveyQuestions.add(question)
      .then(newQuestion => {
        res.status(201).json({ data: newQuestion })
      })
      .catch(err => {
        console.log("POST /survey-questions", err);
        res.status(500).json({ error: "Unable to creat the survey question. Please try again." });
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
            res.status(200).json({ data: updatedQuestion });
          })
          .catch(err => {
            console.log('PUT /survey-questions/:id', err);
            res.status(400).json({ error: "Unable to update the survey question. PLease try again." });
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
          res.status(200).json({ message: `The survey question with ID: ${id} was successfully deleted.` });
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