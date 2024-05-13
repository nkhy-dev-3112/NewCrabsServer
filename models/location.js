'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.belongsTo(models.TerriorialUnit, { foreignKey: 'wardId' })
      Location.belongsTo(models.TerriorialUnit, { foreignKey: 'districtId' })
      Location.belongsTo(models.TerriorialUnit, { foreignKey: 'cityId' })
      Location.belongsTo(models.TerriorialUnit, { foreignKey: 'countryId' })
      Location.hasMany(models.RideRequest, { foreignKey: 'pickupId' })
      Location.hasMany(models.RideRequest, { foreignKey: 'dropoffId' })

    }
  }
  Location.init({
    locationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lng: DataTypes.DOUBLE,
    lat: DataTypes.DOUBLE,
    streetNumber: DataTypes.STRING(50),
    name: DataTypes.STRING(400),
    street: DataTypes.STRING(100),
    fullAddress: DataTypes.STRING(400)
  }, {
    sequelize,
    modelName: 'Location',
    timestamps: false
  });
  return Location;
};