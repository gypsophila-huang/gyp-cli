const path = require("path");
const fse = require("fs-extra");

const jsonConfig = {
  mirror: "",
  name: "gyp-cli",
};

const configPath = path.resolve("../config.json");

module.exports = async function () {
  try {
    await fse.outputJSON(configPath, jsonConfig);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
