'use strict'

const express = require('express');
const router = express.Router();
const indexController = require('../services/statistics-service/index');
const auth = require('../services/account-service/authenticate').Authenticate

router.get('/', auth.requireAuthenticated, indexController.welcome);
router.get("/revenue", auth.requireAdmin, indexController.revenueStatistic)
router.get("driver-ranking", auth.requireAdmin, indexController.driverRanking)
module.exports = router;