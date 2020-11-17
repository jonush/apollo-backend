const router = require("express").Router();
const restricted = require('../../auth/auth-middleware');
const Topics = require("./topics-model");

// GET all topics
router.get("/", restricted, (req, res) => {
  Topics.find()
    .then(topics => {
      res.status(200).json(topics)
    })
    .catch(err => {
      console.log("GET /topics/", err);
      res.status(500).json({ error: err.message });
    })
});

// GET a topic by id
router.get("/:id", restricted, (req,res) => {
  const { id } = req.params;

  Topics.findByID(id)
    .then(topic => {
      if(topic) {
        res.status(200).json(topic);
      } else {
        res.status(404).json({ error: `Unable to find topic with id: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /topics/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// GET all topics by a leader id
router.get("/leader/:id", restricted, (req,res) => {
  const { id } = req.params;

  Topics.findByLeaderID(id)
    .then(topics => {
      if(topics) {
        res.status(200).json(topics);
      } else {
        res.status(404).json({ error: `Unable to find topics from LeaderID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /topics/leader/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// POST a new topic
router.post("/", restricted, (req, res) => {
  let topic = req.body;

  if(req.body.title === "" || req.body.frequency === "") {
    res.status(400).json({ error: "Missing topic title or frequency" });
  } else {
    Topics.add({ ...topic, leader_id: req.decodedToken.subject })
      .then(newTopic => {
        res.status(201).json({ message: `SUCCESS: Topic with ID: ${newTopic.id} created.`, topicID: newTopic.id })
      })
      .catch(err => {
        console.log("POST /topics/", err);
        res.status(500).json({ error: "Unable to creat the topic. Please try again." });
      })
  }
});

// EDIT a topic
router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Topics.findByID(id)
    .then(topic => {
      if(topic) {
        Topics.edit(update, id)
          .then(updatedTopic => {
            res.status(200).json({ message: `SUCCESS: Topic with ID: ${updatedTopic.id} updated.` });
          })
          .catch(err => {
            console.log('PUT /topics/:id', err);
            res.status(400).json({ error: "Unable to update the topic. Please try again." });
          })
      } else {
        res.status(404).json({ error: `Unable to find a topic with id: ${id}` });
      }
    })
    .catch(err => {
      console.log('PUT /topics/:id', err);
      res.status(500).json({ error: "Error occurred while updating the topic", err });
    })
});

// DELETE a topic
router.delete("/:id", restricted, (req, res) => {
  const  { id } = req.params;

  Topics.findByID(id)
    .then(topic => {
      console.log(topic);
      Topics.remove(topic.id)
        .then(removed => {
          console.log(removed);
          res.status(200).json({ message: `SUCCESS: Topic with ID: ${id} deleted.` });
        })
        .catch(err => {
          console.log("DELETE /topics/:id", err);
          res.status(500).json({ error: "There was an error when deleting the topic. Please try again." });
        })
    })
    .catch(err => {
      res.status(400).json({ error: `The topic with ID: ${id} could not be found.` });
    })
});

module.exports = router;