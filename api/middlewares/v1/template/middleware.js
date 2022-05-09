

const jwt  =  require('jsonwebtoken')
const joi = require('joi')

module.exports  = class Middleware {
    constructor() {
        this.jwt = jwt;
        this.joi= joi;
 
    }
}