'use strict'

const indexController = {};
const models = require('../../models');
const FinancialController = require('./financialController');
const DriverController = require('./driverController');

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Statistics Service!"
    })
}

indexController.revenueStatistic = async (req, res) => {
    await FinancialController.revenueStatisticOverview(req, res);
}

indexController.driverRanking = async (req, res) => {
    await DriverController.driverRanking(req, res);
}
module.exports = indexController;