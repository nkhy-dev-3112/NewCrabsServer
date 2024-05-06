'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoucherType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VoucherType.hasOne(models.Voucher, { foreignKey: 'typeId' })
    }
  }
  VoucherType.init({
    typeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING(400)
  }, {
    sequelize,
    modelName: 'VoucherType',
    timestamps: false
  });
  return VoucherType;
};