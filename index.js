"use strict";

const config = require("config");
const mongoose = require("mongoose");
const Web3 = require("web3");

const { ProxyWalletContract } = require("./lib/contracts");
const {
  makeTemplatesController,
  makeProxyWalletsController
} = require("./lib/controllers");
const { makeTemplateModel, makeProxyWalletModel } = require("./lib/models");
const { makeTemplatesRouter, makeProxyWalletsRouter } = require("./lib/routes");
const { createServer } = require("./lib/server");

// Server setup
const serverOptions = config.get("server");
const serverPort = config.get("server.port");
const server = createServer(serverOptions);

// Template setup
const templateDbPath = config.get("database.templateDb");
const templateDb = mongoose.createConnection(templateDbPath);
const templateModel = makeTemplateModel(templateDb);
const templatesCtrl = makeTemplatesController({ model: templateModel });
const templatesRouter = makeTemplatesRouter({
  controller: templatesCtrl
});
templatesRouter.applyRoutes(server, "/templates");

// ProxyWallet setup
const proxyWalletDbPath = config.get("database.proxyWalletDb");
const proxyWalletDb = mongoose.createConnection(proxyWalletDbPath);
const proxyWalletModel = makeProxyWalletModel(proxyWalletDb);
const web3 = new Web3();
web3.setProvider(
  new web3.providers.HttpProvider(config.get("web3.providers.HttpProvider"))
);
const proxyWalletsCtrl = makeProxyWalletsController({
  model: proxyWalletModel,
  web3,
  ProxyWalletContract
});
const proxyWalletsRouter = makeProxyWalletsRouter({
  controller: proxyWalletsCtrl
});
proxyWalletsRouter.applyRoutes(server, "/proxywallet");

// Start server
server.listen(serverPort, function() {
  process.stdout.write("Server listening on port " + serverPort + "..\n");
});
