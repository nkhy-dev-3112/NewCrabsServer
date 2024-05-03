'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../services/index.service');

router.get('/', controller.welcome);
router.get('/createDB', controller.createDB);

module.exports = router;