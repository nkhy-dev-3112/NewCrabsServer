'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoucherUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VoucherUsage.belongsTo(models.Voucher, { foreignKey: 'voucherId' }, this.primaryKeyAttribute)
      VoucherUsage.belongsTo(models.Transaction, { foreignKey: 'transactionId' }, this.primaryKeyAttribute)

    }
  }
  VoucherUsage.init({
  }, {
    sequelize,
    modelName: 'VoucherUsage',
    timestamps: false
  });
  return VoucherUsage;
};