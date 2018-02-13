"use strict";

const Schema = require("mongoose").Schema;

const templateSchema = new Schema({
  title: String
});

function makeTemplateModel({ dbConnection }) {
  return (
    dbConnection.model("Template") ||
    dbConnection.model("Template", templateSchema)
  );
}

module.exports = { makeTemplateModel, templateSchema };
