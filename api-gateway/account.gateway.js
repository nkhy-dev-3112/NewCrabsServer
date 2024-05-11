'use strict'

const express = require('express');
const router = express.Router();
const indexController = require('../services/account-service/index');

router.get('/', indexController.welcome);
router.post('/login', indexController.login);
router.post('/signup', indexController.signup);
module.exports = router;