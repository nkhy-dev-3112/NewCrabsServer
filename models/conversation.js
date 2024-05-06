'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.hasOne(models.Ride, { foreignKey: 'conversationId' })
    }
  }
  Conversation.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conversation',
    timestamps: false
  });
  return Conversation;
};