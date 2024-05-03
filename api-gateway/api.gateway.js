'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the NewCrabs API!",
        mode: [
            "account-service",
            "contact-service",
            "ride-service",
            "statistics-service",
            "transaction-service"
        ]
    });
})

router.use('/account-service', require('./account-service.gateway'));
router.use('/contact-service', require('./contact-service.gateway'));
router.use('/ride-service', require('./ride-service.gateway'));
router.use('/statistics-service', require('./statistics-service.gateway'));
router.use('/transaction-service', require('./transaction-service.gateway'));

module.exports = router;