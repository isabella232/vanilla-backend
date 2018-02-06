"use strict";

const expect = require("chai").expect;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const makeTemplatesModel = require("./templates");

describe("Template model", function() {
  let dbConnection;

  before(function(done) {
    dbConnection = mongoose.createConnection(
      "mongodb://localhost/vanilla-test"
    );
    dbConnection.on("connected", done);
  });

  after(function(done) {
    dbConnection.db.dropDatabase(function() {
      dbConnection.close(done);
    });
  });

  it("should be able to query templates", async function() {
    const model = makeTemplatesModel({ dbConnection, Schema });
    const templateList = await model.find({});
    expect(templateList).to.be.an("array");
  });
});
