const router = require("express").Router();
const restricted = require('../../auth/auth-middleware');
const Responses = require("./responses-model");

// GET all responses
router.get("/", restricted, (req, res) => {
  Responses.find()
    .then(responses => {
      res.status(200).json({ data: responses })
    })
    .catch(err => {
      console.log("GET /responses/", err);
      res.status(500).json({ error: err.message });
    })
});

// GET a response by id
router.get("/:id", restricted, (req,res) => {
  const { id } = req.params;

  Responses.findByID(id)
    .then(response => {
      if(response) {
        res.status(200).json({ data: response });
      } else {
        res.status(404).json({ error: `Unable to find response with id: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /responses/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// GET all responses by a survey id
router.get("/survey/:id", restricted, (req,res) => {
  const { id } = req.params;

  Responses.findBySurveyID(id)
    .then(responses => {
      if(responses) {
        res.status(200).json({ data: responses });
      } else {
        res.status(404).json({ error: `Unable to find responses from survey ID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /responses/survey/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// POST a new response
router.post("/", restricted, (req, res) => {
  let response = req.body;

  if(req.body.response === "" || req.body.question_id === "" || req.body.survey_id === "") {
    res.status(400).json({ error: "Missing survey id, question id, or response" });
  } else {
    Responses.add(response)
      .then(newResponse => {
        res.status(201).json({ message: `SUCCESS: Response with ID: ${newResponse.id} created.` })
      })
      .catch(err => {
        console.log("POST /responses", err);
        res.status(500).json({ error: "Unable to creat the response. Please try again." });
      })
  }
});

// EDIT a response
router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Responses.findByID(id)
    .then(response => {
      if(response) {
        Responses.edit(update, id)
          .then(updatedResponse => {
            res.status(200).json({ message: `SUCCESS: Response with ID: ${updatedResponse.id} updated.` });
          })
          .catch(err => {
            console.log('PUT /responses/:id', err);
            res.status(400).json({ error: "Unable to update the response. Please try again." });
          })
      } else {
        res.status(404).json({ error: `Unable to find a response with id: ${id}` });
      }
    })
    .catch(err => {
      console.log('PUT /responses/:id', err);
      res.status(500).json({ error: "Error occurred while updating the response", err });
    })
});

// DELETE a response
router.delete("/:id", restricted, (req, res) => {
  const  { id } = req.params;

  Responses.findByID(id)
    .then(response => {
      console.log(response);
      Responses.remove(response.id)
        .then(removed => {
          console.log(removed);
          res.status(200).json({ message: `SUCCESS: Response with ID: ${id} deleted.` });
        })
        .catch(err => {
          console.log("DELETE /responses/:id", err);
          res.status(500).json({ error: "There was an error when deleting the response. Please try again." });
        })
    })
    .catch(err => {
      console.log("DELETE /responses/:id", err);
      res.status(400).json({ error: `The response with ID: ${id} could not be found.` });
    })
});

module.exports = router;