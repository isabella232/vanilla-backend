"use strict";

const logger = require("../utils/logger")(module);

function makeProxyWalletsController({ model }) {
  async function getBalanceAt(address) {
    const proxyWallet = await model.findOne({ address }).exec();
    if (proxyWallet) return proxyWallet.getBalance();
    return null;
  }

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
    getBalanceAt,
    getAvailableProxyWallet
  };
}

module.exports = makeProxyWalletsController;
