"use strict";

function makeProxyWalletsRouter({ controller, Router }) {
  const proxyWalletsRouter = new Router();

  async function all(req, res, next) {
    const proxyWalletAddress = await controller.deploy();
    res.send(proxyWalletAddress);
    next();
  }

  proxyWalletsRouter.get("/create", all);

  return proxyWalletsRouter;
}

module.exports = makeProxyWalletsRouter;
