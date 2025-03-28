import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import fs from "fs-extra";
import path from "path";
import { patchMetroConfig } from "../src/patchMetro";

const testProjectRoot = path.resolve("tests/mock-project");

beforeEach(async () => {
  await fs.remove(testProjectRoot);
  await fs.ensureDir(testProjectRoot);
  process.chdir(testProjectRoot);
});

afterEach(async () => {
  await fs.remove(testProjectRoot);
});

describe("patchMetroConfig", () => {
  it("creates a valid metro.config.js file", async () => {
    await patchMetroConfig();

    const configPath = path.join(testProjectRoot, "metro.config.js");
    const content = await fs.readFile(configPath, "utf-8");

    expect(content).toContain("extraNodeModules");
    expect(content).toContain("node_modules_mirror");
  });
});
