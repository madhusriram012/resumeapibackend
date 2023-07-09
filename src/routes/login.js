const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require('config');

const secret = config.get('jwt.secret');

let users = [
  { id: 1, username: 'admin', password: 'admin' }
]

router.post('/', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Username or password should not be empty' })
  }

  const user = users.find(u => u.username === req.body.username && u.password === req.body.password)

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({
    sub: user.id,
    username: user.username
  }, secret, { expiresIn: '6 hours' })

  res.json({ accessToken: token })
});

module.exports = router;
