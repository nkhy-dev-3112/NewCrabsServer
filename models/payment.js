'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Account, { foreignKey: 'ownerId' })
      Payment.hasMany(models.EWallet, { foreignKey: 'paymentId' })
      Payment.hasMany(models.BankAccount, { foreignKey: 'paymentId' })
      Payment.hasMany(models.Card, { foreignKey: 'paymentId' })
      Payment.hasMany(models.Transaction, { foreignKey: 'paymentId' })

    }
  }
  Payment.init({
    paymentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateAdded: DataTypes.DATE,
    partnerName: DataTypes.STRING,
    ownerDisplayName: DataTypes.STRING,
    paymentType: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
    timestamps: false
  });
  return Payment;
};