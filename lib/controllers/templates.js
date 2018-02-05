"use strict";

function makeTemplatesController({ model }) {
  return {
    listAll: async () => {
      const templates = await model.find({});
      return templates;
    }
  };
}

module.exports = makeTemplatesController;
