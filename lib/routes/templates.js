"use strict";

const Router = require("restify-router").Router;

function makeTemplatesRouter({ controller }) {
  const router = new Router();

  async function all(req, res, next) {
    const templates = await controller.listAll();
    res.json(templates);
    next();
  }

  router.get("/", all);

  return router;
}

module.exports = makeTemplatesRouter;
