"use strict";

const fixtures = require("./fixtures.js");

const orderSchema = require("./orders");
const proxyWalletSchema = require("./proxywallets");
const templateSchema = require("./templates");

async function makeModel(name, schema, mongoConnection) {
  let model;

  // Init the model
  try {
    // Load the already created model
    model = mongoConnection.model(name);
  } catch (err) {
    if (err.name !== "MissingSchemaError") throw err;
    // If the connection does not have the model yet, create it
    model = mongoConnection.model(name, schema);
  }

  // Load fixtures
  if (process.env.NODE_ENV === "development") {
    await fixtures.load(model, name);
  }

  return model.init();
}

const makeOrderModel = makeModel.bind(null, "Order", orderSchema);
const makeProxyWalletModel = makeModel.bind(
  null,
  "ProxyWallet",
  proxyWalletSchema
);
const makeTemplateModel = makeModel.bind(null, "Template", templateSchema);

module.exports = {
  makeOrderModel,
  makeProxyWalletModel,
  makeTemplateModel
};
