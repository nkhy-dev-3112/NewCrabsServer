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

router.use('/account', require('./account.gateway'));
router.use('/contact', require('./contact.gateway'));
router.use('/ride', require('./ride.gateway'));
router.use('/statistics', require('./statistics.gateway'));
router.use('/transaction', require('./transaction.gateway'));

module.exports = router;