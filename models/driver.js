'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.CommercialAccount, { foreignKey: 'uid' }, this.primaryKeyAttribute);

    }
  }
  Driver.init({
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    personalId: DataTypes.STRING(50),
    driverLicense: DataTypes.STRING(50),
    phoneContact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
    timestamps: false
  });
  return Driver;
};