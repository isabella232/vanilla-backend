"use strict";

const config = require("config");
const Schema = require("mongoose").Schema;
const BigNumber = require("big-number");
const { isEmail, isHash, isUUID } = require("validator");

const { isETHAddress } = require("../utils/eth");

const orderConf = config.get("constants.order");

const fields = {
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
    maxlength: 5
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
    type: String,
    required: true,
    validate: {
      validator: v => {
        const val = BigNumber(v);
        return (
          val.toString() !== "Invalid Number" &&
          val.gte(0) &&
          val.lte(BigNumber(orderConf.amountMax))
        );
      },
      message: "not-a-valid-amount"
    }
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
};

const orderSchema = new Schema(fields);

module.exports = { orderSchema };
