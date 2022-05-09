/**
 * @description
 */
//Load Express & Router
//Load controllers
const  BaseController =  require('../template/controller');
const  AuthController = require('./auth')

//Load middlewares
const Auth=  require( '../../../middlewares/v1/auth')

//const TokenExpired = require( '../../../middlewares/v1/tokenexpired')

//Create controller instances
const AuthCtrlInstance = new AuthController()
const prop  = new BaseController();
//console.log(prop.validator);
//Create middleware instances
const AuthMdlInstance = new Auth()
//const TokenExpiredMdlInstance = new TokenExpired()

const routes =[
      {
        method: "GET",
        path: "/",
        options: {
            description: "Home Page",
            notes: "Return nothing",
            tags: ["api"], // ADD THIS TAG
          },
        handler: (request, h) => {
          return h.file("index.html");
        },
        
      },
      {
        method: "GET",
        path: "/download",
        handler: (request, h) => {
          return h.file("index.html", {
            mode: "attachment",
            filename: "downlaod.html",
          });
        },
        options: {
          description: "Download the attached file",
          notes: "Return attachment",
          tags: ["api"], // ADD THIS TAG
        },
      },
      {
        method: "GET",
        path: "/location",
        handler: (request, h) => {
          if (request.location) {
            return request.location;
          } else {
            return "<h1>Your location is not enabled by default</h1>";
          }
        },
        options: {
          description: "Locate the ip address of the current location",
          notes: "Return ip address",
          tags: ["api"], // ADD THIS TAG
        },
      },
      {
        method: "GET",
        path: "/users",
        handler: (request, h) => {
          return "<h1>User List</h1>";
        },
      },
      {
        method: "POST",
        path: "/login",
        options: {
          validate: {
            payload: prop.validator.object({
              username: prop.validator.string().min(3).max(10),
              password: prop.validator.string().min(3).max(10),
            }),
            failAction(request, h, err) {     
              request.log("error", err);
              throw err;
            },
          },
        },
        handler:AuthCtrlInstance.login,
       
     },
      {
        method: "*",
        path: "/{any*}",
        handler: (request, h) => {
          return "<h1>This path does not exist.</h1>";
        },
      },
    ];
//userRouter.post('/v1/auth/login', AuthCtrlInstance.login);
//userRouter.post('/v1/auth/logout', [AuthMdlInstance.checkAuth], AuthCtrlInstance.logout);

module.exports = {routes}