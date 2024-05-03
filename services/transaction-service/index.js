'use strict'

const indexController = {};

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Transation Service!"
    })
}

module.exports = indexController;