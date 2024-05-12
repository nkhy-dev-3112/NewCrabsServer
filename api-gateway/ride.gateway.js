'use strict'

const express = require('express');
const router = express.Router();
const indexController = require('../services/ride-service/index');
const auth = require("../services/account-service/authenticate").Authenticate;

router.get('/', indexController.welcome);
router.post('/registerVehicle', auth.requireDriver,indexController.registerVehicle);

module.exports = router;