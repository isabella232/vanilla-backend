"use strict";

const logger = require("../utils/logger")(module);

async function load(model, schemaName) {
  let newObjects;
  try {
    newObjects = require(`./fixtures/${schemaName}.json`);
  } catch (e) {
    newObjects = null;
  }

  if (newObjects) {
    const existing = await model.find({}).exec();
    if (existing.length === 0) {
      await model.collection.insert(newObjects, {}).exec();
      logger.log({
        level: "debug",
        message: `Fixtures for ${schemaName} loaded`
      });
    }
  }
}

module.exports = { load };
