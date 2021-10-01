const router = require('express').Router();

const { createUser, getLogs } = require('../controllers/users');
const { addExercise } = require('../controllers/exercises');

router.post('/api/users', createUser);
router.post('/api/users/:id/exercises', addExercise);
router.get('/api/users/:id/logs', getLogs ); // ?[from][&to][&limit]

module.exports = router;