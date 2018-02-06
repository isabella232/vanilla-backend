"use strict";

function makeTemplatesModel({ dbConnection, Schema }) {
  const templateSchema = new Schema({
    title: String
  });

  return dbConnection.model("Template", templateSchema);
}

module.exports = makeTemplatesModel;
