const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");
const ora = require("ora");
const download = require("download");
const defConfig = require("./config");

const configPath = path.resolve(__dirname, "../config.json");
const templatePath = path.resolve(__dirname, "../template");

module.exports = async function () {
  const exists = await fse.pathExists(configPath);
  if (!exists) {
    await defConfig();
  }
  try {
    await fse.remove(templatePath);
    await fse.mkdir(templatePath);
  } catch (e) {
    console.error(e);
    process.exit();
  }
  const config = await fse.readJSON(configPath);
  const dlSpinner = ora(chalk.cyan("Downloading template..."));
  dlSpinner.start();

  try {
    await download(config.mirror, templatePath, { extract: true });
  } catch (e) {
    dlSpinner.text = chalk.red(`Download template failed. ${e}`);
    dlSpinner.fail();
    process.exit();
  }

  dlSpinner.text = "Download template successful.";
  dlSpinner.succeed();
};
