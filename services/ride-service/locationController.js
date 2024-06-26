'use strict'

const { where } = require('sequelize');
const { Op } = require('sequelize');
const models = require('../../models')
const baseURL = 'https://nominatim.openstreetmap.org/search?addressdetails=1&namedetails=1&format=jsonv2'

class LocationController {

    static async searchLocationOnDb(req, res) {
        const queryString = req.query.q;
        const response = []

        await models.Location.findAll({
            where: {
                [Op.or]: [
                    {
                        fullAddress: {[Op.iLike]: `%${queryString}%`}
                    },
                    {
                        name: {[Op.iLike]: `%${queryString}%`}
                    }
                ]
            }
        }).then(data => {
            for(const item of data) {
                response.push(item.dataValues)
            }    
            res.json({
                data: response
            })
        }).catch(err => {
            res.json({
                message: "Got the error",
                detail: err.message
            })
        })        

    }

    static async geocoding(req, res) {
        const url = `${baseURL}&amenity=${req.query.amenity ? req.query.amenity : ''}&country=${req.query.country ? req.query.country : ''}&street=${req.query.street ? req.query.street : ''}&city=${req.query.city ? req.query.city : ''}&state=${req.query.state ? req.query.state : ''}&county=${req.query.county ? req.query.county : ''}`;
        console.log(url)
        fetch(url).then(response => {
            if (!response.ok) {
                res.json({
                    code: 200,
                    message: "Unable to geocode now"
                })
            } 
            return response.json()
        }).then(data => {

            const returnData = []
            data.forEach(element => {
                returnData.push({
                    lat: element.lat,
                    lng: element.lon,
                    address: element.address,
                    namedetails: element.namedetails
                })
            });

            res.json({
                code: 100,
                message: "Geocode success",
                data: returnData
            })
        }).catch(error => {
            res.json({
                code: 200,
                message: 'There was a problem with the fetch operation:' + error.message
            })
        })
    }

    static async addLocation(req, res) {
        const wardId = req.body.wardId
        const districtId = req.body.districtId
        const cityId = req.body.cityId
        const countryId = req.body.countryId
        const name = req.body.name
        const street = req.body.street
        const lng = req.body.lng
        const lat = req.body.lat
        const streetNumber = req.body.streetNumber

        const wardName = await models.TerriorialUnit.findOne({
            attributes: ['name'],
            where: {unitId: wardId}
        })

        const districtName = await models.TerriorialUnit.findOne({
            attributes: ['name'],
            where: {unitId: districtId}
        })

        const cityName = await models.TerriorialUnit.findOne({
            attributes: ['name'],
            where: {unitId: cityId}
        })

        const countryName = await models.TerriorialUnit.findOne({
            attributes: ['name'],
            where: {unitId: countryId}
        })

        await models.Location.create({
            wardId: wardId,
            districtId: districtId,
            cityId: cityId,
            countryId: countryId,
            name: name,
            street: street,
            lng: lng,
            lat: lat,
            fullAddress: `${streetNumber}, ${street}, ${wardName.dataValues.name}, ${districtName.dataValues.name}, ${cityName.dataValues.name}, ${countryName.dataValues.name}`,
            streetNumber: streetNumber
        }).then(data => {
            res.json({
                code: 100,
                message: "Create location successfully",
                data: data
            })
        }).catch(err => {
            res.json({
                code: 200,
                message: "Create location fail",
                err: err.message
            })
        })
    }

    static async updateTerritorialUnit(req, res) {

        const areaData = require('../../area.db.json');

        await models.TerriorialUnit.create({
            unitId: 84,
            parentId: null,
            name: "Viet Nam",
            level: 0
        })

        await models.TerriorialUnit.create({
            unitId: 79,
            parentId: 84,
            name: "Ho Chi Minh City",
            level: 1
        })

        const disctricts = areaData.district.filter(item => item.idProvince === '79')
        await disctricts.forEach(async element => {
            await models.TerriorialUnit.create({
                unitId: parseInt(element.idDistrict),
                parentId: 79,
                name: element.name,
                level: 2
            })
            const communes = areaData.commune.filter(item => item.idDistrict === element.idDistrict)
            await communes.forEach(async commune => {
                await models.TerriorialUnit.create({
                    unitId: parseInt(commune.idCommune),
                    parentId: parseInt(element.idDistrict),
                    name: commune.name,
                    level: 3
                })
            });
        });

        res.json("done")
    }

    static async territorial(req, res) {
        const result = [];
        const q = req.query.q;
        const getChild = req.query.getChild;
        const getBy = req.query.getBy;

        if (getBy == 'name') {
            const data = await models.TerriorialUnit.findAll({
                where: { name: { [Op.like]: `%${q}%` } }
            });
            for (const item of data) {
                var temp = item.dataValues;
                if (getChild == 1) {
                    temp.children = [];
                    const children = await models.TerriorialUnit.findAll({
                        where: { parentId: temp.unitId }
                    });
                    for (const child of children) {
                        temp.children.push(child.dataValues);
                    }
                }
                result.push(temp);
            }
        } else if (getBy == 'id') {
            const data = await models.TerriorialUnit.findOne({
                where: { unitId: q }
            });
            var temp = data.dataValues;
            if (getChild == 1) {
                temp.children = [];
                const children = await models.TerriorialUnit.findAll({
                    where: { parentId: temp.unitId }
                });
                for (const child of children) {
                    temp.children.push(child.dataValues);
                }
            }
            result.push(temp);
        }
        res.json({
            result
        });     
    }

}

module.exports = LocationController