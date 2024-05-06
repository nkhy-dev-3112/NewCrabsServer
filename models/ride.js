'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ride.belongsTo(models.State, { foreignKey: 'stateId' })
      Ride.belongsTo(models.Conversation, { foreignKey: 'conversationId' })
      Ride.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' })
      Ride.belongsTo(models.RideRequest, { foreignKey: 'requestId' })
    }
  }
  Ride.init({
    rideId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bookingTime: DataTypes.DATE,
    completeTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ride',
    timestamps: false
  });
  return Ride;
};