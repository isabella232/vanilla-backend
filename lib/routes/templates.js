"use strict";

const Router = require("restify-router").Router;

function makeTemplatesRouter({ controller }) {
  const templatesRouter = new Router();

  async function all(req, res, next) {
    const templates = await controller.listAll();
    res.send(templates);
    next();
  }

  templatesRouter.get("/", all);

  return templatesRouter;
}

module.exports = makeTemplatesRouter;
