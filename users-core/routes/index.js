const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const { createUser } = require('../controllers/users');
const { login, authenticate, getMe } = require('../controllers/auth');

router.post('/register', createUser);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.use('/users', authenticate, usersRouter);

module.exports = router;
