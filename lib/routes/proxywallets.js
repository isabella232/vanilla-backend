"use strict";

const Router = require("restify-router").Router;

function makeProxyWalletsRouter({ controller }) {
  const proxyWalletsRouter = new Router();

  async function getProxyWalletAddress(req, res, next) {
    const proxyWallet = controller.getAvailableProxyWallet();
    res.send(proxyWallet.address);
    next();
  }

  proxyWalletsRouter.get("/", getProxyWalletAddress);

  return proxyWalletsRouter;
}

module.exports = makeProxyWalletsRouter;
