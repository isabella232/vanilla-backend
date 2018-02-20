"use strict";

const Schema = require("mongoose").Schema;

const schema = new Schema({
  id: { type: String, unique: true, required: true },
  contractAddress: String
});

module.exports = schema;
