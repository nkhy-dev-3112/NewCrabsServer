'use strict'

const { where } = require('sequelize')
const models = require('../../models')


class AccountController{
    static async updateProfile(data)
    {
        var val;
        await models.Account.update({
            fullname: data.fullname,
            genderId: data.genderId
        },{
            where: {
                id: data.id
            }
        }).then((value) => 
        {
            val = {
                message: "Update Profile Sucessfully!"
            }
        }).catch((error) => {
            val = {
                message: error.message
            }
        })
        return val;
    }
}

module.exports = AccountController