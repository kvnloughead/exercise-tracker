const Exercise = require('../models/exercise');

const parseDate = (date) => {
  // date must be of type Date
  let parsedDate = date.toLocaleDateString("en-US", 
    { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  );
  return parsedDate.replace(/,/g, '');
}

const addExercise = async (req, res) => {
  const { userId } = req.params;
  const { description, duration, date } = req.body;
  Exercise.create({ userId, description, date, duration })
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

module.exports = { addExercise };
