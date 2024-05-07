'use strict'

class NormalAuth {
    login(req, res) {
        res.json({
            message: "Normal authentication successful!"
        });
    }
}

module.exports = { NormalAuth };