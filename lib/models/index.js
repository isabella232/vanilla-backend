"use strict";

const { orderSchema } = require("./orders");
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
const makeTemplateModel = makeModel.bind(null, "Template", templateSchema);

module.exports = {
  makeOrderModel,
  makeTemplateModel,
  orderSchema,
  templateSchema
};
