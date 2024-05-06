'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RideRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RideRequest.belongsTo(models.Account, { foreignKey: 'seekerId' })
      RideRequest.belongsTo(models.Location, { foreignKey: 'pickupId' })
      RideRequest.belongsTo(models.Location, { foreignKey: 'dropoffId' })
      RideRequest.belongsTo(models.State, { foreignKey: 'stateId' })
      RideRequest.belongsTo(models.VehicleType, { foreignKey: 'vehicleTypeId' })
      RideRequest.hasOne(models.Ride, { foreignKey: 'requestId' })
      RideRequest.hasOne(models.Transaction, { foreignKey: 'requestId' })

    }
  }
  RideRequest.init({
    requestId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'RideRequest',
    timestamps: false
  });
  return RideRequest;
};