"use strict";

const createServer = require("./createServer");
const { makeTemplatesController } = require("./controllers");
const { makeTemplatesModel } = require("./models");
const { makeTemplatesRouter } = require("./routes");

module.exports = {
  createServer,
  makeTemplatesController,
  makeTemplatesModel,
  makeTemplatesRouter
};
