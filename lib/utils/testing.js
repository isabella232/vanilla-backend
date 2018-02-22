const config = require("config");
const mongoose = require("mongoose");
const BigNumber = require("big-number");
const crypto = require("crypto");
const uuid = require("../utils/uuid4");
const eth = require("../utils/eth");

function choose(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

function createTestDBConnection() {
  return mongoose.createConnection(config.get("database.all"));
}

function generateValidOrder() {
  const orderConf = config.get("constants.order");
  const posMin = orderConf.positionLeverageMin;
  const posMax = orderConf.positionLeverageMax - posMin;
  const durMin = orderConf.positionDurationMin;
  const durMax = orderConf.positionDurationMax - durMin;
  const amountMax = BigNumber(orderConf.amountMax);

  const orderId = uuid.generate();
  return {
    orderId,
    orderIdHash: crypto
      .createHash("sha256")
      .update(orderId)
      .digest("hex"),
    positionType: choose(orderConf.positionTypeEnum),
    positionLeverage: posMin + Math.floor(Math.random() * Math.floor(posMax)),
    positionDuration: durMin + Math.floor(Math.random() * Math.floor(durMax)),
    currencyPair: choose(orderConf.currencyPairsEnum),
    dateCreated: Date.now(),
    amount: amountMax.toString(),
    withdrawAddress: eth.generate(),
    managerContractAddress: eth.generate(),
    proxyWalletAddress: eth.generate(),
    userEmail: "user@example.com"
  };
}

module.exports = { createTestDBConnection, generateValidOrder };
