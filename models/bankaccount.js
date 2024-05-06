'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BankAccount.belongsTo(models.Payment, { foreignKey: 'paymentId' }, this.primaryKeyAttribute)
    }
  }
  BankAccount.init({
    bankNumber: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'BankAccount',
  });
  return BankAccount;
};