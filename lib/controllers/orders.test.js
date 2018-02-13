"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const { mockModel: model } = require("../utils/testing");

const makeOrdersController = require("./orders");

describe("Orders controller", function() {
  beforeEach(() => {
    sinon.spy(model, "find");
  });

  afterEach(() => {
    model.find.restore();
  });

  describe("listAll", function() {
    it("should return an empty list", async function() {
      const controller = makeOrdersController({ model });
      const templateList = await controller.listAll();
      expect(model.find.calledOnce).to.be.true;
      expect(templateList)
        .to.be.an("array")
        .of.length(0);
    });
  });
});
