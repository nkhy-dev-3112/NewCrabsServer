'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Gender, { foreignKey: 'genderId' });
      Account.belongsTo(models.Role, { foreignKey: 'roleId' })
      Account.hasMany(models.OTP, { foreignKey: 'receiverId' })
      Account.hasMany(models.LinkedAccount, { foreignKey: 'accountId' })
      Account.hasOne(models.CommercialAccount, { foreignKey: 'accountId' })
      Account.hasMany(models.Payment, { foreignKey: 'ownerId' })
      Account.hasOne(models.Vehicle, { foreignKey: 'ownerId' })
      Account.hasMany(models.RideRequest, { foreignKey: 'seekerId' })
    }
  }
  Account.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true
    },
    password: DataTypes.STRING(100),
    fullname: DataTypes.STRING(60),
    dob: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Account',
    timestamps: false
  });
  return Account;
};