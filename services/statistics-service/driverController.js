'use strict'

const models = require('../../models');
const { Op } = require('sequelize');

class DriverController {
    static async driverRanking(req, res) {
        res.json({
            message: "Comming soon"
        })
    }
}

module.exports = DriverController