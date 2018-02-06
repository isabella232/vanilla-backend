"use strict";

function makeTemplatesRouter({ controller, Router }) {
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
