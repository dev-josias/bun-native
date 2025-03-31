#!/usr/bin/env bun
import { program } from "commander";
import { runInit } from "../src/init";
import { patchMetroConfig } from "../src/patchMetro";
import { runPostInstall } from "../src/postinstall";
import { runIOS, runAndroid, runStart, runBundle } from "../src/wrappers";

program
  .name("bun-native")
  .description("Use Bun as a package manager in React Native apps")
  .version("0.1.0");

program
  .command("init [name]")
  .option("-v, --version <version>", "React Native version", "0.78.1")
  .description("Initialize a Bun-powered React Native project")
  .action((name = "MyApp", options) => {
    runInit(name, options.version);
  });

program
  .command("patch-metro")
  .description("Patch Metro bundler for Bun compatibility")
  .action(patchMetroConfig);

program
  .command("postinstall")
  .option("--debug", "Enable debug logging")
  .description("Run postinstall to patch Metro and create mirror layout")
  .action((options) => {
    runPostInstall(options.debug);
  });

program.command("run-ios").action(runIOS);
program.command("run-android").action(runAndroid);
program.command("start").action(runStart);
program.command("bundle").action(runBundle);

program.parse();
