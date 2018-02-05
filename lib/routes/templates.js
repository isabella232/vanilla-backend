"use strict";

const Router = require("restify-router").Router;

function makeTemplatesRouter(options) {
  const templatesRouter = new Router();
  const controller = options.controller;

  function all(req, res, next) {
    const templates = controller.listAll();
    res.send(templates);
    next();
  }

  templatesRouter.get("/", all);

  return templatesRouter;
}

module.exports = makeTemplatesRouter;
