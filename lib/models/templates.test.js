"use strict";

const expect = require("chai").expect;
const mongoose = require("mongoose");

const makeTemplatesModel = require("./templates");

describe("Template model", function() {
  let templateDBConnection;

  before(function(done) {
    templateDBConnection = mongoose.createConnection(
      "mongodb://localhost/vanilla-test"
    );
    templateDBConnection.on("connected", done);
  });

  after(function(done) {
    templateDBConnection.db.dropDatabase(function() {
      templateDBConnection.close(done);
    });
  });

  it("should be able to query templates", async function() {
    const model = makeTemplatesModel({ dbConnection: templateDBConnection });
    const templateList = await model.find({});
    expect(templateList).to.be.an("array");
  });
});
