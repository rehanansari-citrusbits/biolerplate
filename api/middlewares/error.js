// /**
//  * @description
//  */

// export default class ErrorHandler {

//   constructor() { }

//   // handle = (err, req, res, next) => {
//   //   const logger = createLogger({
//   //     level: 'info',
//   //     format: format.combine(
//   //       format.timestamp(),
//   //       format.json()
//   //     ),
//   //     transports: [
//   //       new transports.File({
//   //         filename: 'error.log',
//   //         level: 'error'
//   //       }),
//   //     ],
//   //     exitOnError: false,
//   //   })
//   //   let reqDetails = this.getRequestDetails(req)
//   //   let logMessage = {
//   //     request: reqDetails,
//   //     message: err.message,
//   //     stack: err.stack
//   //   }

//   //   logger.error(logMessage)
//   //   return res.status(500).send('Internal error.')
//   // }
//   // /*
//   //  * Extract and retrive data from req object
//   //  * @author Nagy Ervin
//   //  * @param {*} req 
//   //  * 
//   //  * @retrun Object
//   //  *  
//   //  */
//   // getRequestDetails = (req) => {
//   //   if (!req) return {}
//   //   return {
//   //     body: req.body,
//   //     path: req.path,
//   //     headers: req.headers,
//   //   }
//   // }
// }