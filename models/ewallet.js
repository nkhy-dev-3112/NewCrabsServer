'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EWallet.belongsTo(models.Payment, { foreignKey: 'paymentId' }, this.primaryKeyAttribute)
    }
  }
  EWallet.init({
    accessToken: DataTypes.STRING(400)
  }, {
    sequelize,
    modelName: 'EWallet',
  });
  return EWallet;
};