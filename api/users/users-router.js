const router = require("express").Router();
const restricted = require('../../auth/auth-middleware');
const Users = require("./users-model");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
});

// GET a user by id
router.get("/:id", restricted, (req,res) => {
  const { id } = req.params;

  Users.findByID(id)
    .then(user => {
      if(user) {
        res.status(200).json({ data: user });
      } else {
        res.status(404).json({ error: `Unable to find user with ID: ${id}` });
      }
    })
    .catch(err => {
      console.log("GET /users/:id", err);
      res.status(500).json({ error: err.message });
    })
});

// EDIT a user
router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Users.findByID(id)
    .then(user => {
      if(user) {
        Users.edit(update, id)
          .then(updatedUser => {
            res.status(200).json({ message: `SUCCESS: User with ID: ${updatedUser.id} updated.` });
          })
          .catch(err => {
            console.log('PUT /users/:id', err);
            res.status(400).json({ error: "Unable to update the user. Please try again." });
          })
      } else {
        res.status(404).json({ error: `Unable to find a user with ID: ${id}` });
      }
    })
    .catch(err => {
      console.log('PUT /users/:id', err);
      res.status(500).json({ error: "Error occurred while updating the user", err });
    })
});

// DELETE a user
router.delete("/:id", restricted, (req, res) => {
  const  { id } = req.params;

  Users.findByID(id)
    .then(user => {
      console.log(user);
      Users.remove(user.id)
        .then(removed => {
          console.log(removed);
          res.status(200).json({ message: `SUCCESS: User with ID: ${id} deleted.` });
        })
        .catch(err => {
          console.log("DELETE /users/:id", err);
          res.status(500).json({ error: "There was an error when deleting the user. Please try again." });
        })
    })
    .catch(err => {
      console.log("DELETE /users/:id", err);
      res.status(400).json({ error: `The user with ID: ${id} could not be found.` });
    })
});

module.exports = router;