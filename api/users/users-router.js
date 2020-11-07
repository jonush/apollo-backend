const router = require("express").Router();
const restricted = require('../../auth/auth-middleware');
const Users = require("./users-model");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.send(err));
});

// ADD USER ENDPOINTS

module.exports = router;