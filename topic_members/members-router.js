const router = require("express").Router();
const restricted = require('../auth/auth-middleware');
const TopicMembers = require("../topic_members/members-model");

// GET all topic members
router.get("/", restricted, (req, res) => {
  TopicMembers.find()
    .then(members => {
      res.status(200).json({ data: members })
    })
    .catch(err => {
      console.log("GET /topic-members/", err);
      res.status(500).json({ error: err.message });
    })
});

// GET all topic members by a topic id
router.get("/:id", restricted, (req,res) => {
  const { id } = req.params;

  TopicMembers.findByTopic(id)
    .then(members => {
      if(members) {
        res.status(200).json({ data: members });
      } else {
        res.status(404).json({ error: `Unable to find topic with id: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /topic-members/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// GET a topic member by id
router.get("/members/:id", restricted, (req,res) => {
  const { id } = req.params;

  TopicMembers.findByID(id)
    .then(member => {
      if(member) {
        res.status(200).json({ data: member });
      } else {
        res.status(404).json({ error: `Unable to find topic member with ID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /topic-members/members/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// POST a new topic member
router.post("/", restricted, (req, res) => {
  let member = req.body;

  if(req.body.role === "") {
    res.status(400).json({ error: "Missing topic member role" });
  } else {
    TopicMembers.add(member)
      .then(newMember => {
        res.status(201).json({ data: newMember })
      })
      .catch(err => {
        console.log("POST /topic-members", err);
        res.status(500).json({ error: "Unable to add the topic member. Please try again." });
      })
  }
});

// EDIT a topic member
router.put("/members/:id", restricted, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  TopicMembers.findByID(id)
    .then(member => {
      if(member) {
        TopicMembers.edit(update, id)
          .then(updatedMember => {
            res.status(200).json({ data: updatedMember });
          })
          .catch(err => {
            console.log('PUT /topic-members/members/:id', err);
            res.status(400).json({ error: "Unable to update the topic member. PLease try again." });
          })
      } else {
        res.status(404).json({ error: `Unable to find a topic member with id: ${id}` });
      }
    })
    .catch(err => {
      console.log('PUT /topic-members/members/:id', err);
      res.status(500).json({ error: "Error occurred while updating the topic member", err });
    })
});

// DELETE a topic member
router.delete("/members/:id", restricted, (req, res) => {
  const  { id } = req.params;

  TopicMembers.findByID(id)
    .then(member => {
      console.log(member);
      TopicMembers.remove(member.id)
        .then(removed => {
          console.log(removed);
          res.status(200).json({ message: `The topic member was successfully deleted.` });
        })
        .catch(err => {
          console.log("DELETE /topic-members/members/:id", err);
          res.status(500).json({ error: "There was an error when deleting the topic member. PLease try again." });
        })
    })
    .catch(err => {
      console.log("DELETE /topic-members/members/:id", err);
      res.status(400).json({ error: `The topic member with ID: ${id} could not be found.` });
    })
});

module.exports = router;