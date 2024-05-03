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
    }
  }
  Account.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING(50),
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