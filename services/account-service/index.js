'use strict'
const indexController = {};

const { Authenticate } = require('./authenticate');

const auth = new Authenticate(null);
const accountController = require('./accountController');

// Greeting
indexController.welcome = (req, res) => {
    res.json({
        message: "Welcome to Account Service!"
    })
}

indexController.login = async (req, res) => {
    // Get the strategy code from the request
    const strategy = req.query.s;
    auth.setStrategy(strategy);
    await auth.login(req, res);
}

indexController.signup = async (req, res) => {
    // console.log(req.body);

    const strategy = req.query.s;
    auth.setStrategy(strategy);
    await auth.signup(req, res);
}
indexController.updateProfile = async (req, res) => {
    const data = {
        fullname: req.body.fullname,
        genderId: req.body.genderId,
        id: req.session.user.uid
    };
    const val = await accountController.updateProfile(data);
    res.json(val);
}

module.exports = indexController;