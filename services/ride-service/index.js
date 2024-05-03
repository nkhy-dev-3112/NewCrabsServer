'use strict'

const indexController = {};

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Ride Service!"
    })
}

module.exports = indexController;