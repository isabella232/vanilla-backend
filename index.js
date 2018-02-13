"use strict";

const config = require("config");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Router = require("restify-router").Router;
const Web3 = require("web3");

const { ProxyWalletContract } = require("./lib/contracts");
const {
  makeTemplatesController,
  makeProxyWalletsController
} = require("./lib/controllers");
const { makeTemplatesModel } = require("./lib/models");
const { makeTemplatesRouter, makeProxyWalletsRouter } = require("./lib/routes");
const { createServer } = require("./lib/server");

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

// ProxyWallet setup
const web3 = new Web3();
web3.setProvider(
  new web3.providers.HttpProvider(config.get("web3.providers.HttpProvider"))
);
const proxyWalletsCtrl = makeProxyWalletsController({
  web3,
  ProxyWalletContract
});
const proxyWalletsRouter = makeProxyWalletsRouter({
  controller: proxyWalletsCtrl,
  Router
});
proxyWalletsRouter.applyRoutes(server, "/proxywallet");

// Start server
server.listen(serverPort, function() {
  process.stdout.write("Server listening on port " + serverPort + "..\n");
});
