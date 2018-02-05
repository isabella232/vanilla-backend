"use strict";

function makeTemplatesController(options) {
  const model = options.model;

  return {
    listAll: () => {
      return model.find({});
    }
  };
}

module.exports = makeTemplatesController;
