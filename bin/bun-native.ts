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
  .command("init")
  .description("Initialize a Bun-powered React Native project")
  .action(runInit);

program
  .command("patch-metro")
  .description("Patch Metro bundler for Bun compatibility")
  .action(patchMetroConfig);

program
  .command("postinstall")
  .description("Run postinstall to patch Metro and create mirror layout")
  .action(runPostInstall);

program.command("run-ios").action(runIOS);
program.command("run-android").action(runAndroid);
program.command("start").action(runStart);
program.command("bundle").action(runBundle);

program.parse();
