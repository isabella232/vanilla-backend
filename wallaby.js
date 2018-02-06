module.exports = function() {
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
      { pattern: "lib/**/*.js", instrument: true, load: true, ignore: false }
    ],
    tests: ["lib/**/*.test.js"],
    env: {
      type: "node",
      runner: "node"
    }
  };
};
