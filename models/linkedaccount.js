'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LinkedAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LinkedAccount.belongsTo(models.Account, { foreignKey: 'accountId' })
    }
  }
  LinkedAccount.init({
    accessToken: {
      type: DataTypes.STRING(400),
      primaryKey: true,
    },
    serviceName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LinkedAccount',
    timestamps: false
  });
  return LinkedAccount;
};