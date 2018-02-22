"use strict";

const makeOrdersRouter = require("./orders");
const makeProxyWalletsRouter = require("./proxywallets");
const makeTemplatesRouter = require("./templates");

module.exports = {
  makeOrdersRouter,
  makeProxyWalletsRouter,
  makeTemplatesRouter
};
