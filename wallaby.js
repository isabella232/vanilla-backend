module.exports = function() {
  // process.env.NODE_ENV = "test";

  return {
    files: [
      {
        pattern: "lib/**/*.test.js",
        instrument: false,
        load: false,
        ignore: true
      },
      {
        pattern: "lib/**/index.js",
        instrument: false,
        load: true,
        ignore: false
      },
      {
        pattern: "config/**/*.json",
        instrument: false,
        load: true,
        ignore: false
      },
      {
        pattern: "lib/utils/test_setup.js",
        instrument: false,
        load: true,
        ignore: false
      },
      { pattern: "lib/**/*.js", instrument: true, load: true, ignore: false }
    ],
    tests: ["lib/**/*.test.js"],
    env: {
      type: "node",
      runner: "node"
    },
    bootstrap: function() {
      require("./lib/utils/test_setup");
    }
  };
};
