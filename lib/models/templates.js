"use strict";

const Schema = require("mongoose").Schema;

function makeTemplatesModel({ dbConnection }) {
  const templateSchema = new Schema({
    title: String
  });

  return dbConnection.model("Template", templateSchema);
}

module.exports = makeTemplatesModel;
