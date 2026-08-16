const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware'); // <-- Import Middleware

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// PROTECTED ROUTE: You must have a valid token to access this
router.get('/me', protect, getMe);

module.exports = router;
