"use strict";

const makeOrdersController = require("./orders");
const makeProxyWalletsController = require("./proxywallets");
const makeTemplatesController = require("./templates");

module.exports = {
  makeOrdersController,
  makeProxyWalletsController,
  makeTemplatesController
};
