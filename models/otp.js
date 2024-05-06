'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OTP.belongsTo(models.Account, { foreignKey: "receiverId" });
    }
  }
  OTP.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sentAt: DataTypes.DATE,
    validUntil: DataTypes.DATE,
    code: DataTypes.STRING(20),
    isVerify: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'OTP',
    timestamps: false
  });
  return OTP;
};