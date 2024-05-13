'use strict'

const indexController = {};
const models = require('../../models')
const LocationController = require('./locationController')
const CostController = require('./costController')

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Ride Service!"
    })
}

indexController.registerVehicle = async (req, res) => {
    await models.Vehicle.create ({
        brand: req.body.brand,
        licensePlate: req.body.licensePlate,
        color: req.body.color,
        ownerId: req.session.user.uid,
        typeId: req.body.typeId
    }).then ((value) => {
        if(value){
            res.json({
                message:"Create Vehicle Sucessfully!"
            })
        }
        
    }).catch((error) => {
        console.log("Error in registering vehicle")
        res.json({
            message: error.message
        })
    })
    
}

indexController.searchLocation = async (req, res) => {
    await LocationController.searchLocationOnDb(req, res)
}

indexController.updateUnit = async (req, res) => {
    await LocationController.updateTerritorialUnit(req, res);
}

indexController.createLocation = async (req, res) => {
    await LocationController.addLocation(req, res)
}

indexController.geocode = async (req, res) =>  {
    await LocationController.geocoding(req, res);
}

indexController.territorial = async (req, res) => {
    await LocationController.territorial(req, res)
}

indexController.addCost = async (req, res) => {
    await CostController.add(req, res)
}

indexController.getCost = async (req, res) => {
    await CostController.get(req, res)
}

module.exports = indexController;