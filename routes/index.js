const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { addExercise, getLog } = require('../controllers/exercises');

router.post('/api/users', createUser);
// router.post('/users/:id/exercises', addExercise);

module.exports = router;