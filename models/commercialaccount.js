'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommercialAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommercialAccount.belongsTo(models.Account, { foreignKey: 'accountId' }, this.primaryKeyAttribute)
      CommercialAccount.hasOne(models.Client, { foreignKey: 'uid' })
      CommercialAccount.hasOne(models.Driver, { foreignKey: 'uid' })
    }
  }
  CommercialAccount.init({

    phone: {
      type: DataTypes.STRING(10),
      unique: true
    },
    accountId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'CommercialAccount',
    timestamps: false
  });
  return CommercialAccount;
};