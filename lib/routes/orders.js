"use strict";

const Router = require("restify-router").Router;

function makeOrderRouter({ controller }) {
  const router = new Router();

  async function createOrder(req, res, next) {
    if (!(req.body && req.body.order)) {
      res.send(400);
      return next();
    }

    try {
      const newOrder = await controller.createOrder(req.body.order);
      res.json(201, newOrder);
    } catch (e) {
      res.send(400);
      return next();
    }

    next();
  }

  async function getOrder(req, res, next) {
    const order = await controller.getOrder(req.params.orderId);
    res.json(201, order);
    next();
  }

  router.post("/", createOrder);
  router.get("/:orderId", getOrder);

  return router;
}

module.exports = makeOrderRouter;
