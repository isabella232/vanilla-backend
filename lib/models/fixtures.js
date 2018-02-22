"use strict";

const logger = require("../utils/logger")(module);

async function load(model, schemaName) {
  let newObjects;
  try {
    // eslint-disable-next-line security/detect-non-literal-require
    newObjects = require(`./fixtures/${schemaName}.json`);
  } catch (e) {
    newObjects = null;
  }

  if (newObjects) {
    const existing = await model.find({}).exec();
    if (existing.length === 0) {
      await model.insertMany(newObjects);
      logger.log({
        level: "debug",
        message: `Fixtures for ${schemaName} loaded`
      });
    }
  }
}

module.exports = { load };
