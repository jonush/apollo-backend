const router = require("express").Router();
const restricted = require("../../auth/auth-middleware");
const Questions = require("./questions-model");

// GET all questions
router.get("/", restricted, (req, res) => {
  Questions.find()
    .then(questions => {
      res.status(200).json({ data: questions })
    })
    .catch(err => {
      console.log("GET /questions/", err);
      res.status(500).json({ error: err.message });
    })
});

// GET a question by id
router.get("/:id", restricted, (req,res) => {
  const { id } = req.params;

  Questions.findByID(id)
    .then(question => {
      if(question) {
        res.status(200).json({ data: question });
      } else {
        res.status(404).json({ error: `Unable to find question with id: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /questions/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// GET all questions by a topic id
router.get("/topic/:id", restricted, (req,res) => {
  const { id } = req.params;

  Questions.findByTopicID(id)
    .then(questions => {
      if(questions) {
        res.status(200).json({ data: questions });
      } else {
        res.status(404).json({ error: `Unable to find questions from Topic ID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /questions/topic/:id", err);
      res.status(500).json({ error: err.message });
    })
});

router.get("/topic/:id/default", restricted, (req, res) => {
  const { id } = req.params;

  Questions.findByDefault(id)
    .then(questions => {
      if(questions) {
        res.status(200).json({ data: questions });
      } else {
        res.status(404).json({ error: `Unable to find default questions from Topic ID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /questions/topic/:id/default", err);
      res.status(500).json({ error: err.message })
    }) 
})

// POST a new question
router.post("/", restricted, (req, res) => {
  let question = req.body;

  if(req.body.question === "") {
    res.status(400).json({ error: "Missing question" });
  } else {
    Questions.add(question)
      .then(newQuestion => {
        res.status(201).json({ data: newQuestion })
      })
      .catch(err => {
        console.log("POST /questions", err);
        res.status(500).json({ error: "Unable to creat the question. Please try again." });
      })
  }
});

// EDIT a question
router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Questions.findByID(id)
    .then(question => {
      if(question) {
        Questions.edit(update, id)
          .then(updatedQuestion => {
            res.status(200).json({ data: updatedQuestion });
          })
          .catch(err => {
            console.log('PUT /questions/:id', err);
            res.status(400).json({ error: "Unable to update the question. PLease try again." });
          })
      } else {
        res.status(404).json({ error: `Unable to find a question with id: ${id}` });
      }
    })
    .catch(err => {
      console.log('PUT /questions/:id', err);
      res.status(500).json({ error: "Error occurred while updating the question", err });
    })
});

// DELETE a question
router.delete("/:id", restricted, (req, res) => {
  const  { id } = req.params;

  Questions.findByID(id)
    .then(question => {
      console.log(question);
      Questions.remove(question.id)
        .then(removed => {
          console.log(removed);
          res.status(200).json({ message: `The question with ID: ${id} was successfully deleted.` });
        })
        .catch(err => {
          console.log("DELETE /questions/:id", err);
          res.status(500).json({ error: "There was an error when deleting the question. Please try again." });
        })
    })
    .catch(err => {
      console.log("DELETE /questions/:id", err);
      res.status(400).json({ error: `The question with ID: ${id} could not be found.` });
    })
});

module.exports = router;