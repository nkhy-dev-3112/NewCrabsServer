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

    login(req, res){
        this.strategy.login(req, res);  
    }

    

}

module.exports = { Authenticate };