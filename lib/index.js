"use strict";

const { createServer } = require("./server");
const { makeTemplatesController } = require("./controllers");
const { makeTemplatesModel } = require("./models");
const { makeTemplatesRouter } = require("./routes");
const { makeProxyWalletController } = require("./controllers");

module.exports = {
  createServer,
  makeTemplatesController,
  makeTemplatesModel,
  makeTemplatesRouter,
  makeProxyWalletController
};
