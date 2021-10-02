const router = require('express').Router();

const { getUsers, createUser, getLogs } = require('../controllers/users');
const { addExercise } = require('../controllers/exercises');

router.get('/api/users', getUsers);
router.post('/api/users', createUser);
router.get('/api/users/:id/logs', getLogs ); // ?[from][&to][&limit]

router.post('/api/users/:id/exercises', addExercise);

module.exports = router;