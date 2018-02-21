"use strict";

const config = require("config");
const Schema = require("mongoose").Schema;
const { isEmail, isHash, isHexadecimal, isUUID } = require("validator");

const orderConf = config.get("constants.order");

function isETHAddress(str) {
  if (str.length !== 42) return false;
  return str.substring(0, 2) === "0x" && isHexadecimal(str.substring(2));
}

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: v => isUUID(v, 4)
    }
  },
  orderIdHash: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: v => isHash(v, "sha256")
    }
  },
  positionType: {
    type: String,
    required: true,
    enum: orderConf.positionTypeEnum,
    minlength: 4,
    maxlength: 4
  },
  positionLeverage: {
    type: Number,
    required: true,
    min: orderConf.positionLeverageMin,
    max: orderConf.positionLeverageMax
  },
  positionDuration: {
    type: Number,
    required: true,
    min: orderConf.positionDurationMin,
    max: orderConf.positionDurationMax
  },
  currencyPair: {
    type: String,
    required: true,
    enum: orderConf.currencyPairsEnum,
    minlength: 7,
    maxlength: 7
  },
  dateCreated: { type: Date, required: true, default: Date.now },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  withdrawAddress: {
    type: String,
    required: true,
    validate: {
      validator: v => isETHAddress(v),
      message: "not-a-valid-eth-address"
    }
  },
  managerContractAddress: {
    type: String,
    required: false,
    default: null,
    validate: {
      validator: v => !v || isETHAddress(v),
      message: "not-a-valid-eth-address"
    }
  },
  proxyWalletAddress: {
    type: String,
    required: false,
    default: null,
    validate: {
      validator: v => !v || isETHAddress(v),
      message: "not-a-valid-eth-address"
    }
  },
  userEmail: {
    type: String,
    required: false,
    default: null,
    validate: {
      validator: v => !v || isEmail(v),
      message: "not-a-valid-email-address"
    }
  }
});

module.exports = orderSchema;
