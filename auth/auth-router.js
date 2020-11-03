const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("../api/users/users-model");
const { isValid } = require('../api/users/users-service');
const hidden = require('./vars');

// POST to create a new user
router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        console.log("POST to /register", err);
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "Missing email or password", userId: credentials.id });
  }
});

// POST to log in as a user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ email: email })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({ data: user, token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        console.log("POST to /login", err);
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(500).json({ message: "Email and password are required" });
  }
});

// GET to log out
router.get("/logout", (req, res) => {
  if (req.session) {
    if (err) {
      res.status(500).json({ message: "Failed to log out" });
    } else {
      res.status(204).end();
    }
  } else {
    res.status(204).end();
  }
});

const createToken = user => {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const secret = hidden.jwtSecret;

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;
