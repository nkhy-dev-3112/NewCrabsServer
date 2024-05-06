'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TerriorialUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TerriorialUnit.hasOne(models.TerriorialUnit, { foreignKey: 'parentId' })
      TerriorialUnit.hasMany(models.Location, { foreignKey: 'wardId' })
      TerriorialUnit.hasMany(models.Location, { foreignKey: 'districtId' })
      TerriorialUnit.hasMany(models.Location, { foreignKey: 'cityId' })
      TerriorialUnit.hasMany(models.Location, { foreignKey: 'countryId' })
    }
  }
  TerriorialUnit.init({
    unitId: {
      type: DataTypes.INTEGER,
      primaryKey: true,

    },
    name: DataTypes.STRING(40),
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TerriorialUnit',
    timestamps: false
  });
  return TerriorialUnit;
};