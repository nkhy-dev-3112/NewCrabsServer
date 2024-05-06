'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoucherCondition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VoucherCondition.hasOne(models.Voucher, { foreignKey: "conditionId" });
    }
  }
  VoucherCondition.init({
    conditionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    requireAttribute: DataTypes.STRING(200),
    value: DataTypes.DOUBLE,
    description: DataTypes.STRING(400)
  }, {
    sequelize,
    modelName: 'VoucherCondition',
    timestamps: false
  });
  return VoucherCondition;
};