'use strict'

const express = require('express');
const router = express.Router();
const indexController = require('../services/ride-service/index');
const auth = require("../services/account-service/authenticate").Authenticate;

router.get('/', indexController.welcome);
router.post('/registerVehicle', auth.requireDriver,indexController.registerVehicle);
router.get('/location/search', indexController.searchLocation)
router.get('/location/updateUnit', indexController.updateUnit);
router.post('/location/create', indexController.createLocation)
router.get('/location/geocode', indexController.geocode)

module.exports = router;