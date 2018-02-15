"use strict";

const logger = require("../utils/logger")(module);

function makeProxyWalletsController({ model }) {
  async function getAvailableProxyWallet() {
    const proxyWallet = await model
      .findOne({
        orderId: null
      })
      .exec();

    if (!proxyWallet) {
      logger.log({
        level: "warn",
        message: "No available proxy wallets"
      });
    }

    return proxyWallet;
  }

  return {
    getAvailableProxyWallet
  };
}

module.exports = makeProxyWalletsController;
