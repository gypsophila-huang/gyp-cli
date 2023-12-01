const path = require("path");
const fse = require("fs-extra");
const defConfig = require("./config");
const configPath = path.resolve(__dirname, "../config.json");

module.exports = async function (link) {
  const symbols = (await import("log-symbols")).default;
  const exists = await fse.pathExists(configPath);
  if (!exists) {
    await defConfig();
  }

  try {
    const config = await fse.readJSON(configPath);
    config.mirror = link;
    await fse.writeJSON(configPath, config);
    console.log(symbols.success, "Set the mirror successful!");
  } catch (e) {
    console.log(symbols.error, `Set the mirror failed. ${e}`);
    process.exit();
  }
};
