"use strict";

const Router = require("restify-router").Router;

const uuid = require("../utils/uuid4");
const { objectValidator } = require("../utils/validators");

const validOrderKeys = [{ name: "id", validate: uuid.validate }];

function makeOrderRouter({ controller }) {
  const router = new Router();
  const orderValidator = objectValidator(validOrderKeys, false, false);

  async function createOrder(req, res, next) {
    if (
      !(req.body && req.body.order && orderValidator.validate(req.body.order))
    ) {
      res.send(400);
      return next();
    }

    const sanitizedOrder = orderValidator.sanitize(req.body.order);
    const newOrder = await controller.createOrder(sanitizedOrder);
    res.json(201, newOrder);

    next();
  }

  router.post("/", createOrder);

  return router;
}

module.exports = makeOrderRouter;
