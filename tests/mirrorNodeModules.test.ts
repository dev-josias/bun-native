import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import fs from "fs-extra";
import path from "path";
import { mirrorNodeModules } from "../src/mirrorNodeModules";

const testRoot = path.resolve("tests/mock-mirror");

beforeEach(async () => {
  await fs.remove(testRoot);
  await fs.ensureDir(path.join(testRoot, ".bun/install/cache/dummy-pkg"));

  // Add dummy package with package.json
  await fs.writeJson(
    path.join(testRoot, ".bun/install/cache/dummy-pkg/package.json"),
    { name: "dummy-pkg" }
  );

  await fs.writeFile(
    path.join(testRoot, ".bun/install/cache/dummy-pkg/index.js"),
    'module.exports = "hello";'
  );

  process.chdir(testRoot);
});

afterEach(async () => {
  await fs.remove(testRoot);
});

describe("mirrorNodeModules", () => {
  it("should create node_modules_mirror with packages from Bun cache", async () => {
    await mirrorNodeModules();

    const mirrorPath = path.join(testRoot, "node_modules_mirror", "dummy-pkg");
    const exists = await fs.pathExists(mirrorPath);
    expect(exists).toBe(true);
  });
});
