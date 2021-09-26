const User = require('../models/user');

const createUser = (req, res) => {
  User.create({ username: req.body.username })
    .then((user) => {
      const { username, _id } = user;
      res.send({ username, _id });
    })
    .catch((err) => {
      res.send(err);
    });
}

module.exports = { createUser }