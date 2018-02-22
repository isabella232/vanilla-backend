"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const { createTestDBConnection } = require("../utils/testing");
const { makeTemplateModel: makeModel } = require("../models");
const makeController = require("./templates");

describe("Templates controller", function() {
  let dbConnection;
  let model;
  let controller;

  before(async () => {
    dbConnection = createTestDBConnection();
    model = await makeModel(dbConnection);
    await model.remove({}).exec();
    controller = makeController({ model });
  });

  beforeEach(() => {
    sinon.spy(model, "find");
  });

  afterEach(() => {
    model.find.restore();
  });

  after(() => {
    dbConnection.close();
  });

  describe("listAll", function() {
    it("should return an empty list", async function() {
      const templateList = await controller.listAll();
      expect(model.find.calledOnce).to.be.true;
      expect(templateList)
        .to.be.an("array")
        .of.length(0);
    });
  });
});
