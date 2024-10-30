const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);

module.exports = router;