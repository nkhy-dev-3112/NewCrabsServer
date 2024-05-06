'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.hasMany(models.Ride, { foreignKey: 'stateId' })
      State.hasMany(models.RideRequest, { foreignKey: 'stateId' })
      State.hasMany(models.Transaction, { foreignKey: 'stateId' })
    }
  }
  State.init({
    stateId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'State',
    timestamps: false
  });
  return State;
};