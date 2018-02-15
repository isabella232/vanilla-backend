"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const { createTestDBConnection } = require("../utils/testing");
const { makeProxyWalletModel } = require("./");

describe("makeProxyWalletModel", function() {
  let dbConnection;

  before(() => {
    dbConnection = createTestDBConnection();
  });

  beforeEach(() => {
    sinon.spy(dbConnection, "model");
  });

  afterEach(() => {
    dbConnection.model.restore();
  });

  after(() => {
    dbConnection.close();
  });

  it("should be able to init the model", async function() {
    makeProxyWalletModel(dbConnection);
    expect(dbConnection.model.callCount).to.be.above(0);
  });
});

describe("Template schema", function() {});
