const User = require('../models/user');

const createUser = (req, res) => {
  User.create({ username: req.body.username })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
}

module.exports = { createUser }