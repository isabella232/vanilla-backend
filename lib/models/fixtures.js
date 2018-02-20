"use strict";

const logger = require("../utils/logger")(module);

function load(model, schemaName) {
  let newObjects;
  try {
    // eslint-disable-next-line
    newObjects = require(`./fixtures/${schemaName}.json`);
  } catch (e) {
    newObjects = null;
  }

  if (newObjects) {
    model
      .find({})
      .exec()
      .then(objects => {
        if (objects.length === 0) {
          model.collection.insert(newObjects, {}, () => {
            logger.log({
              level: "debug",
              message: `Fixtures for ${schemaName} loaded`
            });
          });
        }
      });
  }
}

module.exports = { load };
