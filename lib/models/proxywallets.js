"use strict";

const Schema = require("mongoose").Schema;

const { makeProxyWalletContract } = require("../contracts");

const proxyWalletSchema = new Schema({
  orderId: { type: String, default: null },
  address: String,
  created: { type: Date, default: Date.now },
  lastTx: Date
});

proxyWalletSchema.methods.getBalance = async function() {
  const balance = await makeProxyWalletContract(this.address)
    .methods.balance()
    .call();
  return parseInt(balance);
};

module.exports = { proxyWalletSchema };
