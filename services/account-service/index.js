'use strict'
const indexController = {};

const { Authenticate } = require('./authenticate');

const auth = new Authenticate(null);

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Account Service!"
    })
}

indexController.login = (req, res) => {
    // Get the strategy code from the request
    const strategy = req.query.strategy;
    auth.setStrategy(strategy);
    auth.login(req, res);
}

module.exports = indexController;