'use strict'

const indexController = {};

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Statistics Service!"
    })
}

module.exports = indexController;