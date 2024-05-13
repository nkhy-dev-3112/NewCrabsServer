'use strict'

const models = require('../../models')
const bcrypt = require("bcrypt");
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const account = require('../../models/account');

class NormalAuth {
    async login(req) {
        var res = null;
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await models.Account.findOne({
                attributes: ['id', 'username', 'password', 'roleId'],
                where: { username: username}
            })

            if (user) {
                // Compare password
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    res = {
                        isAuthenticated: true,
                        user: user.dataValues,
                        message: "Login in success!"
                    }
                } else {
                    res = {
                        isAuthenticated: false,
                        user: null,
                        message: "Wrong password or username!"
                    }
                }
            } else {
                res = {
                    isAuthenticated: false,
                    user: null,
                    message: "We can't found any account with this username!"
                }
            }

        }

        return res;
    }

    async signup(req, res) {
        const respone = await this.createAccount(req);
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
            response = {
                code: 100,
                message: "Create account successfull!",
            }
            switch (role) {
                case 1: {
                    await this.createClientAccount(data.dataValues.id, req, response)
                    break
                }
                case 2: {
                    await this.createDriverAccount(data.dataValues.id, req, response)
                    break
                }
                case 3,4: {
                    break;
                }
                default: {
                    await data.destroy();
                }
            }
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
        await models.CommercialAccount.create({
            accountId: uid,
            phone: data.body.phone
        }).then(async (data_Stage1) => {
            response.code = 110
            await models.Client.create({
                uid: uid,
                email: data.body.email
            }).then(data_Stage2 => {
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

    async createDriverAccount(uid, data, response) {
        await models.CommercialAccount.create({
            accountId: uid,
            phone: data.body.phone
        }).then(async (data_Stage1) => {
            response.code = 110
            await models.Driver.create({
                uid: uid,
                personalId: data.body.personalId,
                driverLicense: data.body.driverLicense,
                phoneContact: data.body.phoneContact
            })
            .then(data_Stage2 => {
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