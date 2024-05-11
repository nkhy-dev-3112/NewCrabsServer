'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feedback.belongsTo(models.Client, { foreignKey: 'uid' })
      Feedback.belongsTo(models.Ride, { foreignKey: 'rideId' })
    }
  }
  Feedback.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    feedback: DataTypes.STRING(400),
    star: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feedback',
    timestamps: false
  });
  return Feedback;
};