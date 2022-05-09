const userRouter = require('./router')
module.exports = (server, globalConfig) => {
  
  //console.log(server);
  //console.log(userRouter);
  server.route(userRouter.userRouter.routes)

}