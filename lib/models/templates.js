"use strict";

const Schema = require("mongoose").Schema;

function makeTemplatesModel(options) {
  const templateSchema = new Schema({
    title: String
  });

  return options.dbConnection.model("Template", templateSchema);
}

module.exports = makeTemplatesModel;
