"use strict";

const Schema = require("mongoose").Schema;

const templateSchema = new Schema({
  title: String
});

module.exports = templateSchema;
