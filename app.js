"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("./package");
const Joi = require("joi");
const path = require("path");
const port = process.env.PORT || 8181
require('dotenv').config()
const globalConfig = {
  appRoot: __dirname,
  apiDomain: process.env.DOMAIN || "localhost",
  method: process.env.METHOD || "http",
  port: process.env.PORT || 8181, // set 8000 for default port
};
const swaggerOptions = {
  info: {
    title: "Test API Documentation",
    version: Pack.version,
  },
};

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      files: {
        relativeTo: path.join(__dirname, "static"),
      },
    },
  });
  await server.register([
    {
      plugin: require("hapi-geo-locate"),
      option: {
        enabledByDefault: true,
      },
    },
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  require('./startup/index')(server, globalConfig)
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
