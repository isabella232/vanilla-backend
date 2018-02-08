"use strict";

const { createServer } = require("./server");
const {
  makeTemplatesController,
  makeProxyWalletsController
} = require("./controllers");
const { makeTemplatesModel } = require("./models");
const { makeTemplatesRouter, makeProxyWalletsRouter } = require("./routes");

module.exports = {
  createServer,
  makeTemplatesController,
  makeTemplatesModel,
  makeTemplatesRouter,
  makeProxyWalletsController,
  makeProxyWalletsRouter
};
