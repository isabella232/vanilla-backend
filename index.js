"use strict";

const {
  createServer,
  makeTemplatesController,
  makeTemplatesModel,
  makeTemplatesRouter
} = require("./lib");

const mockDBConnection = {
  model: () => ({
    find: () => []
  })
};

const server = createServer({});

const templatesModel = makeTemplatesModel({ dbConnection: mockDBConnection });
const templatesCtrl = makeTemplatesController({ model: templatesModel });
const templatesRouter = makeTemplatesRouter({ controller: templatesCtrl });

templatesRouter.applyRoutes(server, "/templates");

server.listen(8080, function() {
  process.stdout.write("Server listening...\n");
});
