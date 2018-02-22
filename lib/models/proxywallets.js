"use strict";

const Schema = require("mongoose").Schema;
const { isUUID } = require("validator");

const { isETHAddress } = require("../utils/eth");
const { makeProxyWalletContract } = require("../contracts");

const fields = {
  address: {
    type: String,
    required: true,
    validate: {
      validator: v => !v || isETHAddress(v),
      message: "not-a-valid-eth-address"
    }
  },
  dateCreated: { type: Date, required: true, default: Date.now },
  orderId: {
    type: String,
    required: false,
    validate: {
      validator: v => !v || isUUID(v, 4)
    }
  },
  lastTx: { type: Date, default: null }
};

const proxyWalletSchema = new Schema(fields);

proxyWalletSchema.methods.getBalance = function() {
  return makeProxyWalletContract(this.address)
    .methods.balance()
    .call();
};

module.exports = proxyWalletSchema;
