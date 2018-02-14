"use strict";

const Schema = require("mongoose").Schema;

const orderSchema = new Schema({
  uuid: String,
  contractAddress: String
});

module.exports = { orderSchema };
