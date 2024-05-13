'use strict'

const { NormalAuth } = require("./normalAuth");
class Authenticate{

    static NORMAL = 1;

    constructor(strategy) {
        this.strategy = strategy;
    } 

    setStrategy(strategy) {
        this.strategy = strategy;
    }   

    setStrategy(strategyCode) {
        switch(strategyCode) {
            case Authenticate.NORMAL:
                this.strategy = new NormalAuth();
                break;
            default:
                this.strategy = new NormalAuth();
                break;
        }
    }

    async login(req, res){
        const authRes = await this.strategy.login(req);
        console.log(authRes)
        if (authRes.isAuthenticated) {
            req.session.user = {uid: authRes.user.id, username: authRes.user.username, scope: authRes.user.roleId}
            res.json({
                isAuthenticated: true,
                scope: authRes.user.roleId,
                message: "Login successfully!"
            })
        } else {
            res.json(authRes);
        }
    }

    static requireAuthenticated(req, res, next) {
        if (req.session && req.session.user) {
            return next();
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    static requireUser(req, res, next, usercode) {
        if (req.session && req.session.user && req.session.scope === usercode) {
            return next();
        } else {
            res.status(401).json({ error: 'Unauthorized or not a suitable type of account!' });
        }
    }
    static requireDriver(req, res, next) {
        if (req.session && req.session.user && req.session.user.scope === 2) {
            console.log(req.session.user.scope);
            return next();
        } else {
            res.status(401).json({ error: 'Unauthorized or not a suitable type of account!' });
        }
    }


    async signup(req, res) {
        await this.strategy.signup(req, res);
    }
    
    signout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.json({
                    code: 200,
                    message: "Error destroying session",
                    detail: err.message
                })
            }
            res.json({
                code: 100,
                message: "Logout successfully"
            })
        })
    }

}

module.exports = { Authenticate };