/**
 * @description
 */


const  validator = require('joi')
const jwt = require('jsonwebtoken')
/**
 * @class BaseController
 */
 module.exports = class BaseController {

	constructor() {	
		this.validator = validator		
		this.jwt = jwt
	}
}