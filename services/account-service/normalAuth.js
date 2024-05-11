'use strict'

const models = require('../../models')
const bcrypt = require("bcrypt");
class NormalAuth {
    login(req, res) {
        res.json({
            message: "Normal authentication successful!"
        });
    }

    async signup(req, res) {
        const respone = await this.createAccount(req);

        console.log(respone);
        res.json(respone);    
    }

    async createAccount(req) {
        const role = req.body.role;
        const username = req.body.username;
        const password = req.body.password;
        const fullname = req.body.fullname;
        const dob = req.body.dob;
        const gender = req.body.gender;
        
        const hashedPass = await bcrypt.hash(password, 10);
        var response = {}
        await models.Account.create({
            fullname: fullname,
            password: hashedPass,
            username: username,
            genderId: gender,
            role: role,
            dob: dob,
            roleId: role
        }).then(async (data) => {
            console.log(data.dataValues)
            response = {
                code: 100,
                message: "Create account successfull!",
            }
            await this.createClientAccount(data.dataValues.id, req, response)
        })
        .catch((err) => {
            console.log(err)
            response = {
                code: 0,
                message: "Create account failed",
                detail: err.message
            }
        })      

        return response;
    }

    async createClientAccount(uid, data, response) {
        console.log(uid)
        await models.CommercialAccount.create({
            accountId: uid,
            phone: data.body.phone
        }).then(async (data) => {
            response.code = 110
            await models.Client.create({
                uid: uid,
                email: data.email
            }).then(data => {
                response.code = 111
            }).catch ((err) => {
                response.code = 0
                response.message = "Fail to create Client account"
                response.detail = err.message
            })
        }).catch((err) => {
            response.code = 0
            response.message = "Fail to create Commercial account"
            response.detail = err.message
        })
    }

}

module.exports = { NormalAuth };