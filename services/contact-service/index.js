'use strict'

const indexController = {};

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Contact Service!"
    })
}

module.exports = indexController;