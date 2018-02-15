"use strict";

const Schema = require("mongoose").Schema;

const proxyWalletSchema = new Schema({
  orderId: String,
  address: String,
  created: { type: Date, default: Date.now },
  lastTx: Date
});

module.exports = { proxyWalletSchema };
