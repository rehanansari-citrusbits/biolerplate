/**
 * @description
 */
const Middleware =  require('./template/middleware')

module.exports = class validator extends Middleware {

	constructor() {
		super()
	}

	/**
	 * @description
	 * @author Nagy Ervin
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 * 
	 * @retrun next 
	 */
	validator = (req, res, next) => {
		const token = req.header('x-auth-token')
		if (!token) return res.status(401).send('Access denied! No authentication token provided.')
		try {
			const payload = this.jwt.verify(token, this.config.get('jwtPrivateKey'))
			req.currentUser = payload
			next()
		} catch (ex) {
			return res.status(401).send('Invalid token found.')
		}
	}
}