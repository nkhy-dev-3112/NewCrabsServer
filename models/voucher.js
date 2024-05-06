'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.belongsTo(models.VoucherType, { foreignKey: "typeId" })
      Voucher.belongsTo(models.VoucherCondition, { foreignKey: "conditionId" })
      Voucher.hasMany(models.VoucherUsage, { foreignKey: 'voucherId' })
    }
  }
  Voucher.init({
    voucherId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.STRING(100),
    voucherName: DataTypes.STRING(200),
    quantity: DataTypes.INTEGER,
    usage: DataTypes.INTEGER,
    state: DataTypes.DATE,
    end: DataTypes.DATE,
    isDiscountByPercent: DataTypes.BOOLEAN,
    discountValue: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Voucher',
    timestamps: false
  });
  return Voucher;
};