"use strict";

const config = require("config");
const Schema = require("mongoose").Schema;
const Web3 = require("web3");
const { isEmail, isUUID } = require("validator");

const { isETHAddress, isSoliditySha3 } = require("../utils/eth");
const { makeOrdersManagerContract } = require("../contracts");

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
      validator: v => isSoliditySha3(v)
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
    required: false,
    validate: {
      validator: v => {
        const val = Web3.utils.toBN(v);
        return (
          !v ||
          (val.toString() !== "Invalid Number" &&
            val.gte(0) &&
            val.lte(Web3.utils.toBN(orderConf.amountMax)))
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

orderSchema.options.toJSON = {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
};

orderSchema.virtual("dateCreated_ms").get(function() {
  return this.dateCreated.getTime();
});

orderSchema.methods.prepareOrder = function() {
  return [
    this.orderIdHash,
    Web3.utils.utf8ToHex(this.currencyPair),
    Web3.utils.utf8ToHex(this.positionType),
    this.positionDuration,
    this.positionLeverage,
    this.withdrawAddress
  ];
};

orderSchema.methods.sendOrder = function() {
  if (!this.managerContractAddress) {
    throw new Error("no-managercontract-address");
  }

  if (!this.proxyWalletAddress) {
    throw new Error("no-proxywallet-address");
  }

  return makeOrdersManagerContract(this.managerContractAddress)
    .methods.createOrder(...this.prepareOrder())
    .send({
      from: this.proxyWalletAddress,
      value: this.amount
    });
};

module.exports = { orderSchema };
