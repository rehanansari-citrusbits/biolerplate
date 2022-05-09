const Hapi = require("@hapi/hapi");
const hapiauthjwt2 = require("hapi-auth-jwt2")
const JWT   = require('jsonwebtoken');
require("dotenv").config();
const people = {
  // our "users database"
  1: { id:1,"name":"Charlie" }
};

// bring your own validation function
const validate = async function (decoded, request, h) {
  // do your checks to see if the person is 
  console.log(decoded);
  if (!people[decoded.id]) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

const init = async () => {
  const server = new Hapi.server({ port: 8000 });
  // include our module here ↓↓, for example, require('hapi-auth-jwt2')
 await server.register(hapiauthjwt2);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.SECRECT_KEY, // Never Share your secret key
    validate, // validate function defined above
    verifyOptions: {      
        algorithms: [ 'HS256' ]    // specify your secure algorithm
      }

  });
  const obj   = { id:1,"name":"Charlie" }; // object/info you want to sign
  //console.log(process.env.SECRECT_KEY);
  const token = JWT.sign(obj, process.env.SECRECT_KEY);
  console.log(token);
  server.auth.default("jwt");

  server.route([
    {
      method: "GET",
      path: "/",
      config: { auth: false },
      handler: function (request, h) {
        return { text: "Token not required" };
      },
    },
    {
      method: "GET",
      path: "/restricted",
      config: { auth: "jwt" },
      handler: function (request, h) {
        const response = h.response({ text: "You used a Token!" });
        response.header("Authorization", request.headers.authorization);
        return response;
      },
    },
  ]);
  await server.start();
  return server;
};
init()
  .then((server) => {
    console.log("Server running at:", server.info.uri);
  })
  .catch((err) => {
    console.log(err);
  });
