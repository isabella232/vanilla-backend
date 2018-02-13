"use strict";

const { makeOrderModel, orderSchema } = require("./orders");
const { makeTemplateModel, templateSchema } = require("./templates");

module.exports = {
  makeOrderModel,
  makeTemplateModel,
  orderSchema,
  templateSchema
};
