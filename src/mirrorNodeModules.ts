import fs from "fs-extra";
import path from "path";
import os from "os";
import chalk from "chalk";

const localCachePath = path.resolve(".bun/install/cache");
const globalCachePath = path.join(os.homedir(), ".bun/install/cache");
const mirrorPath = path.resolve("node_modules_mirror");

export async function mirrorNodeModules(debugMode = false): Promise<void> {
  console.log(
    chalk.blue("🔄 Generating node_modules_mirror/ for Metro compatibility...")
  );

  let bunCachePath = localCachePath;

  if (!(await fs.pathExists(bunCachePath))) {
    console.warn(
      chalk.yellow("⚠️  Local Bun cache not found at .bun/install/cache")
    );

    if (await fs.pathExists(globalCachePath)) {
      console.log(chalk.gray("📦 Using global Bun cache as fallback..."));
      bunCachePath = globalCachePath;
    } else {
      console.error(
        chalk.red("❌ Bun cache not found anywhere. Have you run bun install?")
      );
      return;
    }
  }

  if (debugMode) {
    console.log(chalk.gray("📂 Using Bun cache from:"), bunCachePath);
    console.log(chalk.gray("📂 Mirroring into:"), mirrorPath);
  }

  await fs.ensureDir(mirrorPath);

  const packages = await fs.readdir(bunCachePath);

  if (packages.length === 0) {
    console.warn(chalk.yellow("⚠️ No packages found in Bun cache."));
    return;
  }

  for (const file of packages) {
    const fullPath = path.join(bunCachePath, file);
    const stats = await fs.stat(fullPath);

    if (stats.isDirectory()) {
      const pkgJsonPath = path.join(fullPath, "package.json");

      if (await fs.pathExists(pkgJsonPath)) {
        const pkgJson = await fs.readJson(pkgJsonPath);
        const pkgName = pkgJson.name;

        if (pkgName) {
          const dest = path.join(mirrorPath, pkgName);

          if (debugMode) {
            console.log(chalk.gray(`📦 Mirroring ${pkgName} → ${dest}`));
          }

          await fs.copy(fullPath, dest, { overwrite: true });
        }
      }
    }
  }

  console.log(chalk.green("✅ node_modules_mirror generated successfully."));
}
