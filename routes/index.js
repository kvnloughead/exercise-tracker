const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { addExercise, getLog } = require('../controllers/exercises');

router.post('/api/users', createUser);
router.post('/api/users/:id/exercises', addExercise);
router.get('/api/users/:id/logs'); // ?[from][&to][&limit]

module.exports = router;