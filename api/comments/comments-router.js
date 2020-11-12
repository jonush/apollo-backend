const router = require("express").Router();
const restricted = require("../../auth/auth-middleware");
const Comments = require("./comments-model");

// GET all comments
router.get("/", restricted, (req, res) => {
  Comments.find()
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(err => {
      console.log("GET /comments/", err);
      res.status(500).json({ error: err.message });
    })
});

// GET a comment by id
router.get("/:id", restricted, (req,res) => {
  const { id } = req.params;

  Comments.findByID(id)
    .then(comment => {
      if(comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ error: `Unable to find comment with id: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /comments/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// GET all comments by a response id
router.get("/response/:id", restricted, (req,res) => {
  const { id } = req.params;

  Comments.findByResponseID(id)
    .then(comments => {
      if(comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: `Unable to find comments from Response ID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /comments/response/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// POST a new comment
router.post("/", restricted, (req, res) => {
  let comment = req.body;

  if(req.body.comment === "" || req.body.user_id === "" || req.body.response_id === "") {
    res.status(400).json({ error: "Missing comment, user ID, or response ID" });
  } else {
    Comments.add(comment)
      .then(newComment => {
        res.status(201).json({ message: `SUCCESS: Comment with ID: ${newComment.id} created.` })
      })
      .catch(err => {
        console.log("POST /comments", err);
        res.status(500).json({ error: "Unable to creat the comment. Please try again." });
      })
  }
});

// EDIT a comment
router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Comments.findByID(id)
    .then(comment => {
      if(comment) {
        Comments.edit(update, id)
          .then(updatedComment => {
            res.status(200).json({ message: `SUCCESS: Comment with ID: ${updatedComment.id} updated.` });
          })
          .catch(err => {
            console.log('PUT /comments/:id', err);
            res.status(400).json({ error: "Unable to update the comment. Please try again." });
          })
      } else {
        res.status(404).json({ error: `Unable to find a comment with id: ${id}` });
      }
    })
    .catch(err => {
      console.log('PUT /comments/:id', err);
      res.status(500).json({ error: "Error occurred while updating the comment", err });
    })
});

// DELETE a comment
router.delete("/:id", restricted, (req, res) => {
  const  { id } = req.params;

  Comments.findByID(id)
    .then(question => {
      console.log(question);
      Comments.remove(question.id)
        .then(removed => {
          console.log(removed);
          res.status(200).json({ message: `SUCCESS: Comment with ID: ${id} deleted.` });
        })
        .catch(err => {
          console.log("DELETE /comments/:id", err);
          res.status(500).json({ error: "There was an error when deleting the comment. Please try again." });
        })
    })
    .catch(err => {
      console.log("DELETE /comments/:id", err);
      res.status(400).json({ error: `The comment with ID: ${id} could not be found.` });
    })
});

module.exports = router;