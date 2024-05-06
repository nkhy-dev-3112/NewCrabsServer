'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.Payment, { foreignKey: 'paymentId' }, this.primaryKeyAttribute)
    }
  }
  Card.init({
    cardNumber: DataTypes.STRING(100),
    secureCode: DataTypes.STRING(100),
    cardHolderName: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};