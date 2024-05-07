'use strict'

const express = require('express');
const router = express.Router();
const indexController = require('../services/statistics-service/index');

router.get('/', indexController.welcome);

module.exports = router;