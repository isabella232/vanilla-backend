"use strict";

const Router = require("restify-router").Router;

function makeProxyWalletsRouter({ controller }) {
  const proxyWalletsRouter = new Router();

  async function create(req, res, next) {
    const proxyWalletAddress = await controller.deploy();
    res.send(proxyWalletAddress);
    next();
  }

  async function testBalance(req, res, next) {
    const test = await controller.testBalance(req.params.address);
    res.send(test);
    next();
  }

  async function getBalance(req, res, next) {
    const walletBalance = await controller.getBalance(req.params.address);
    res.send(JSON.stringify(walletBalance));
    next();
  }

  async function destroy(req, res, next) {
    await controller.destroy(req.params.address);
    res.send("ebin");
    next();
  }

  proxyWalletsRouter.get("/create", create);
  proxyWalletsRouter.get("/balance/:address", getBalance);
  proxyWalletsRouter.get("/pay/:address", testBalance);
  proxyWalletsRouter.get("/destroy/:address", destroy);

  return proxyWalletsRouter;
}

module.exports = makeProxyWalletsRouter;
