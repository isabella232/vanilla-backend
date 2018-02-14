"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const { testDBConnection: dbConnection } = require("../utils/testing");
const { makeProxyWalletModel } = require("./");

describe("makeProxyWalletModel", function() {
  beforeEach(() => {
    sinon.spy(dbConnection, "model");
  });

  afterEach(() => {
    dbConnection.model.restore();
  });

  it("should be able to init the model", async function() {
    makeProxyWalletModel(dbConnection);
    expect(dbConnection.model.callCount).to.be.above(0);
  });
});

describe("Template schema", function() {});
