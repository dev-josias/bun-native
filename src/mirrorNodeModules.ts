import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const bunCachePath = path.resolve(".bun/install/cache");
const mirrorPath = path.resolve("node_modules_mirror");

export async function mirrorNodeModules() {
  console.log(
    chalk.blue("🔄 Generating node_modules_mirror/ for Metro compatibility...")
  );

  if (!(await fs.pathExists(bunCachePath))) {
    console.error(
      chalk.red("❌ Bun cache not found. Have you run bun install?")
    );
    return;
  }

  await fs.ensureDir(mirrorPath);

  const packages = await fs.readdir(bunCachePath);
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
          await fs.copy(fullPath, dest, { overwrite: true });
        }
      }
    }
  }

  console.log(chalk.green("✅ node_modules_mirror generated successfully."));
}
