'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      Vehicle.belongsTo(models.Account, { foreignKey: 'ownerId' }, this.primaryKeyAttribute)
      Vehicle.belongsTo(models.VehicleType, { foreignKey: 'typeId' })
      Vehicle.hasMany(models.Ride, { foreignKey: 'vehicleId' })
    }
  }
  Vehicle.init({
    vehicleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    licensePlate: DataTypes.STRING(50),
    brand: DataTypes.STRING(50),
    color: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Vehicle',
    timestamps: false
  });
  return Vehicle;
};