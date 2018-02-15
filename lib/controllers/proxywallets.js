"use strict";

const logger = require("../utils/logger")(module);

function makeProxyWalletsController({ model }) {
  async function getAvailableProxyWallet() {
    // TODO: This needs to tie the proxywallet to an order
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
