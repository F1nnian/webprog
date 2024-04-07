const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the routes for the User API

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;