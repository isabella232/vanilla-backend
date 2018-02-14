"use strict";

const Schema = require("mongoose").Schema;

const proxyWalletSchema = new Schema({
  orderId: String,
  address: String,
  created: Date,
  lastTx: Date
});

module.exports = { proxyWalletSchema };
