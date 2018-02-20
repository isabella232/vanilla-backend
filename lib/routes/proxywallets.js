"use strict";

const Router = require("restify-router").Router;

function makeProxyWalletsRouter({ controller }) {
  const router = new Router();

  async function getProxyWalletAddress(req, res, next) {
    const proxyWallet = await controller.getAvailableProxyWallet();
    res.json(proxyWallet.address);
    next();
  }

  router.get("/", getProxyWalletAddress);

  return router;
}

module.exports = makeProxyWalletsRouter;
