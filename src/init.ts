import fs from "fs-extra";
import { execSync } from "child_process";
import chalk from "chalk";

export async function runInit() {
  console.log(chalk.cyan("⚡ Creating React Native project using Bun..."));

  const appName = "BunNativeApp";
  execSync(`npx react-native init ${appName}`, { stdio: "inherit" });

  process.chdir(appName);

  console.log(chalk.green("✅ Installing dependencies with Bun..."));
  await fs.remove("node_modules");
  await fs.remove("package-lock.json");
  await fs.remove("yarn.lock");

  execSync(`bun install`, { stdio: "inherit" });

  console.log(
    chalk.green("🎉 Project initialized! Run `bun-native patch-metro` next.")
  );
}
