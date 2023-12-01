#!/usr/bin/env node
const { program } = require("commander");
const init = require('../lib/init');
const update = require('../lib/update');
const mirror = require("../lib/mirror");
const download = require("../lib/download");
const pkg = require("../package.json");

program.version(pkg.version, "-v, --version");

program
  .command("upgrade")
  .description("Check the gyp-cli version.")
  .action(() => {
    update();
  });

program
  .command("mirror <template_mirror>")
  .description("Set the template mirror")
  .action((link) => {
    mirror(link);
  });

program
  .command("template")
  .description("Download template from mirror")
  .action(() => {
    download();
  });

program
  .name("gyp-cli")
  .usage("<commands> [options]")
  .command("init <project_name>")
  .description("Create a javascript plugin project...")
  .action((name) => {
    init(name);
  });

program.parse(process.argv);
