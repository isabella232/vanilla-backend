"use strict";

const expect = require("chai").expect;

const makeTemplatesController = require("./templates");

const mockModel = {
  find: () => Promise.resolve([])
};

describe("Template controller", function() {
  describe("listAll", function() {
    it("should return an empty list", async function() {
      const controller = makeTemplatesController({ model: mockModel });
      const templateList = await controller.listAll();
      expect(templateList)
        .to.be.an("array")
        .of.length(0);
    });
  });
});
