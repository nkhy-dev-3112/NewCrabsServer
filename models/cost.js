'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cost.belongsTo(models.VehicleType, { foreignKey: 'vehicleType' });
    }
  }
  Cost.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    base: DataTypes.DOUBLE,
    distanceRate: DataTypes.DOUBLE,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Cost',
    timestamps: false
  });
  return Cost;
};