"use strict";

const Schema = require("mongoose").Schema;

const orderSchema = new Schema({
  id: { type: String, unique: true, required: true },
  contractAddress: String
});

module.exports = orderSchema;
