"use strict";

const config = require("config");
const mongoose = require("mongoose");

const { createServer } = require("./lib/server");

const {
  makeOrdersController,
  makeProxyWalletsController,
  makeTemplatesController
} = require("./lib/controllers");
const {
  makeOrderModel,
  makeProxyWalletModel,
  makeTemplateModel
} = require("./lib/models");
const {
  makeOrdersRouter,
  makeProxyWalletsRouter,
  makeTemplatesRouter
} = require("./lib/routes");

// Server setup
const serverOptions = config.get("server");
const serverPort = config.get("server.port");
const server = createServer(serverOptions);

// Order setup
const orderDbPath = config.get("database.orderDb");
const orderDb = mongoose.createConnection(orderDbPath);
makeOrderModel(orderDb).then(orderModel => {
  // makeModel returns a promise which resolves when indexes are built
  const ordersCtrl = makeOrdersController({
    model: orderModel
  });
  const ordersRouter = makeOrdersRouter({
    controller: ordersCtrl
  });
  ordersRouter.applyRoutes(server, "/orders");
});

// ProxyWallet setup
const proxyWalletDbPath = config.get("database.proxyWalletDb");
const proxyWalletDb = mongoose.createConnection(proxyWalletDbPath);
makeProxyWalletModel(proxyWalletDb).then(proxyWalletModel => {
  // makeModel returns a promise which resolves when indexes are built
  const proxyWalletsCtrl = makeProxyWalletsController({
    model: proxyWalletModel
  });
  const proxyWalletsRouter = makeProxyWalletsRouter({
    controller: proxyWalletsCtrl
  });
  proxyWalletsRouter.applyRoutes(server, "/proxywallets");
});

// Template setup
const templateDbPath = config.get("database.templateDb");
const templateDb = mongoose.createConnection(templateDbPath);
makeTemplateModel(templateDb).then(templateModel => {
  // makeModel returns a promise which resolves when indexes are built
  const templatesCtrl = makeTemplatesController({ model: templateModel });
  const templatesRouter = makeTemplatesRouter({
    controller: templatesCtrl
  });
  templatesRouter.applyRoutes(server, "/templates");
});

// Start server
server.listen(serverPort, function() {
  process.stdout.write(
    `Server running with env '${
      process.env.NODE_ENV
    }' and listening on port '${serverPort}'..\n`
  );
});
