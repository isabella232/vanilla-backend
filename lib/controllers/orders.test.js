"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const { testDBConnection: dbConnection } = require("../utils/testing");
const { makeOrderModel } = require("../models");
const makeController = require("./orders");

describe("Orders controller", function() {
  const model = makeOrderModel(dbConnection);
  const controller = makeController({ model });

  beforeEach(() => {
    sinon.spy(model, "find");
  });

  afterEach(() => {
    model.find.restore();
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
