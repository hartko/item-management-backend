const express = require('express');
const router = express.Router();
const {loginValidation, registerValidation} = require('../validator/auth.validator'); 

const authController = require('./auth.controller');

router.post('/login',loginValidation(), authController.login);
router.post('/register',registerValidation(), authController.register);

module.exports = router;