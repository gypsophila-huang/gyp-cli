const chalk = require("chalk");
const pkg = require("../package.json");

module.exports = async function () {
  const updateNotifier = (await import("update-notifier")).default;
  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000,
  });
  if (notifier.update) {
    console.log(
      `New Version available: ${chalk.cyan(
        notifier.update.latest
      )}, It's recommended that you update before using.`
    );
  } else {
    console.log("No new version is available");
  }
};
