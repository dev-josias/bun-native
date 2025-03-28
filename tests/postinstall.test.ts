import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import fs from "fs-extra";
import path from "path";
import { runPostInstall } from "../src/postinstall";

const testRoot = path.resolve("tests/mock-postinstall");

beforeEach(async () => {
  await fs.remove(testRoot);
  await fs.ensureDir(path.join(testRoot, ".bun/install/cache/sample-pkg"));
  await fs.writeJson(
    path.join(testRoot, ".bun/install/cache/sample-pkg/package.json"),
    {
      name: "sample-pkg",
    }
  );

  process.chdir(testRoot);
});

afterEach(async () => {
  await fs.remove(testRoot);
});

describe("runPostInstall", () => {
  it("should create metro.config.js and node_modules_mirror folder", async () => {
    await runPostInstall();

    const mirrorPath = path.join(testRoot, "node_modules_mirror/sample-pkg");
    const configPath = path.join(testRoot, "metro.config.js");

    expect(await fs.pathExists(mirrorPath)).toBe(true);
    expect(await fs.pathExists(configPath)).toBe(true);
  });
});
