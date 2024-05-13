'use strict'

const { where } = require('sequelize')
const models = require('../../models')

class CostController {
    static async add(req, res) {
        const vehicleType = req.body.vehicleType
        const base = req.body.base
        const distanceRate = req.body.distanceRate
        const timeRate = req.body.timeRate
        const start = req.body.start
        const end = req.body.end

        await models.Cost.create({
            vehicleType: vehicleType,
            base: base,
            distanceRate: distanceRate,
            timeRate: timeRate,
            startTime: start,
            endTime: end
        }).then(data => {
            res.json({
                code: 100,
                message: "Create cost successfull",
                data: data
            })
        }).catch(err => {
            res.json({
                code: 200,
                message: "Create cost failed",
                detail: err.message
            })
        })
    }

    static refineCostData(data) {
        const res = [];
        for(const cost of data) {
            const temp = cost.dataValues;
        }
        return res;
    }

    static async get(req, res) {
        const vehicleType = req.query.vehicleType
        const start = req.query.start
        const end = req.query.end

        await models.Cost.findAll(
            {
                where: {vehicleType: vehicleType}
            }
        ).then((data) => {
            data = CostController.refineCostData(data)
            console.log(data)
            if (data.length > 0) {
                if (start && end) {

                } else {
                    
                }
            } else {
                res.json({
                    code: 201,
                    message: "Please check the vehicle type!"
                })
            }
        }).catch((err) => {
            res.json({
                code: 200,
                message: "There is a error!",
                detail: err.message
            })
        })
    }

}

module.exports = CostController