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
        })
        .catch((err) => console.log(err));
      return exercise;
    })
    .then((exercise) => {
      Exercise.populate(exercise, { path: 'userId' })
        .then((exercise) => {
          const { userId: user, description, date, duration } = exercise;
          const result = { 
            description, 
            _id: user._id, 
            username: user.username, 
            date: parseDate(date), 
            duration: parseFloat(duration) 
          }
          res.send(result);
        })
    })  
    .catch((err) => {
      res.send(err);
    });
}

// const getLogs = (req, res) => {
//   const { id: userId } = req.params;
//   const { from, to, limit } = req.query;
//   Exercise.find({ userId })
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// }

module.exports = { addExercise };
