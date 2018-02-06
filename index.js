"use strict";

const config = require("config");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Router = require("restify-router").Router;

const {
  createServer,
  makeTemplatesController,
  makeTemplatesModel,
  makeTemplatesRouter
} = require("./lib");

// const mockDBConnection = {
//   model: () => ({
//     find: () => []
//   })
// };

// Server setup
const serverOptions = config.get("server");
const serverPort = config.get("server.port");
const server = createServer(serverOptions);

// Template setup
const templateDbPath = config.get("database.templateDb");
const templateDb = mongoose.createConnection(templateDbPath);
const templatesModel = makeTemplatesModel({ dbConnection: templateDb, Schema });
const templatesCtrl = makeTemplatesController({ model: templatesModel });
const templatesRouter = makeTemplatesRouter({
  controller: templatesCtrl,
  Router
});
templatesRouter.applyRoutes(server, "/templates");

// Start server
server.listen(serverPort, function() {
  process.stdout.write("Server listening on port " + serverPort + "..\n");
});
