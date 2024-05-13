'use strict'

const express = require('express');
const router = express.Router();
const indexController = require('../services/account-service/index');
const auth = require("../services/account-service/authenticate").Authenticate;

router.get('/', indexController.welcome);
router.post('/login', indexController.login);
router.post('/signup', indexController.signup);
router.post('/updateProfile',auth.requireAuthenticated, indexController.updateProfile);
router.get('/signout', auth.requireAuthenticated, indexController.signout);
module.exports = router;