"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;
const mongoose = require("mongoose");

const { makeTemplateModel } = require("./");

describe("makeTemplateModel", function() {
  const dbConnection = mongoose.createConnection();

  beforeEach(() => {
    sinon.spy(dbConnection, "model");
  });

  afterEach(() => {
    dbConnection.model.restore();
  });

  it("should be able to init the model", async function() {
    makeTemplateModel(dbConnection);
    expect(dbConnection.model.calledTwice).to.be.true;
  });
});

describe("Template schema", function() {});
