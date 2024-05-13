'use strict'

const indexController = {};
const models = require('../../models')


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

module.exports = indexController;