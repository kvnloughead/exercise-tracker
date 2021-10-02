const Exercise = require('../models/exercise');
const User = require('../models/user');

const { parseDate } = require('../utils/helpers');

const addExercise = (req, res) => {
  const { id } = req.params;
  const { description, duration, date } = req.body;
  Exercise.create({ userId: id, description, date, duration })
    .then((exercise) => {
      User.findById(id)
        .then((user) => {
          user.logs.push(exercise._id);
          user.save();
          res.send({ _id: user._id, username: user.username, description, date: date ? parseDate(date) : parseDate(Date.now()), duration: parseInt(duration) })
        })
        .catch((err) => console.log(err));
      return exercise;
    })
    .catch((err) => {
      res.send(err);
    });
}

module.exports = { addExercise };
