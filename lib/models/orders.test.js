"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const { mockConnection: dbConnection } = require("../utils/testing");

const { makeOrderModel } = require("./orders");

describe("makeOrderModel", function() {
  beforeEach(() => {
    sinon.spy(dbConnection, "model");
  });

  afterEach(() => {
    dbConnection.model.restore();
  });

  it("should be able to init the model", async function() {
    makeOrderModel({ dbConnection });
    expect(dbConnection.model.calledTwice).to.be.true;
  });
});

describe("Order schema", function() {});
