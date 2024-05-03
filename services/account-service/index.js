'use strict'

const indexController = {};

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Account Service!"
    })
}

module.exports = indexController;