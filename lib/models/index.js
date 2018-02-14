"use strict";

const { orderSchema } = require("./orders");
const { proxyWalletSchema } = require("./proxywallets");
const { templateSchema } = require("./templates");

function makeModel(name, schema, mongoConnection) {
  try {
    return mongoConnection.model(name);
  } catch (err) {
    if (err.name !== "MissingSchemaError") throw err;
    return mongoConnection.model(name, schema);
  }
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
  makeTemplateModel,
  orderSchema,
  proxyWalletSchema,
  templateSchema
};
