'use strict'

const controller = {};

// Greeting
controller.welcome = (req, res) => {
    res.json({ message: "Welcome to the NewCrabs Server Side" });
}

// Create database
controller.createDB = async (req, res) => {
    try {
        let models = require('../models');
        await models.sequelize.sync();
        res.json({ message: "Database created" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create database", message: error.message });
    }
}

module.exports = controller;