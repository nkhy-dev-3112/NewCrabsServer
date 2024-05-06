'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Payment, { foreignKey: 'paymentId' })
      Transaction.belongsTo(models.RideRequest, { foreignKey: 'requestId' })
      Transaction.belongsTo(models.State, { foreignKey: 'stateId' })

      Transaction.hasMany(models.VoucherUsage, { foreignKey: 'transactionId' })
    }
  }
  Transaction.init({
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    platformFee: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
    timestamps: false
  });
  return Transaction;
};