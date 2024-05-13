'use strict'

const express = require('express');
const router = express.Router();
const indexController = require('../services/ride-service/index');
const auth = require("../services/account-service/authenticate").Authenticate;

router.get('/', indexController.welcome);
router.post('/registerVehicle', auth.requireDriver,indexController.registerVehicle);
router.get('/location/search', auth.requireAuthenticated, indexController.searchLocation)
//router.get('/location/updateUnit', indexController.updateUnit);
router.post('/location/create', auth.requireAuthenticated, indexController.createLocation)
router.get('/location/geocode', auth.requireAuthenticated, indexController.geocode)
router.get('/location/territorial', auth.requireAuthenticated, indexController.territorial)

router.post('/cost/add', auth.requireAdmin, indexController.addCost)
router.get('/cost/get', auth.requireAuthenticated, indexController.getCost)

module.exports = router;