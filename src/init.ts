import fs from "fs-extra";
import { execSync } from "child_process";
import chalk from "chalk";
import { runPostInstall } from "./postinstall";

export async function runInit(
  projectName = "MyApp",
  rnVersion?: string
): Promise<void> {
  try {
    console.log(
      chalk.cyan(`📦 Initializing React Native project: ${projectName}`)
    );

    execSync(
      rnVersion
        ? `npx @react-native-community/cli@latest init ${projectName} --version ${rnVersion}`
        : `npx @react-native-community/cli@latest init ${projectName}`,
      { stdio: "inherit" }
    );

    process.chdir(projectName);

    console.log(chalk.yellow("🧹 Removing npm artifacts..."));
    fs.removeSync("node_modules");
    fs.removeSync("package-lock.json");
    fs.removeSync("yarn.lock");

    console.log(chalk.cyan("🚀 Installing dependencies using Bun..."));
    execSync("bun install", { stdio: "inherit" });

    console.log(chalk.blue("🔧 Patching Metro for Bun compatibility..."));
    await runPostInstall();

    if (process.platform === "darwin" && fs.existsSync("ios")) {
      console.log(
        chalk.gray(
          "\n📦 For iOS setup:\n  cd ios && bundle install && bundle exec pod install\n"
        )
      );
    }

    console.log(chalk.green(`🎉 Project ${projectName} ready! Try:`));
    console.log(chalk.green(`👉  cd ${projectName} && bun-native start`));
  } catch (err) {
    console.error(
      "❌ Failed to initialize project:",
      (err as Error).message || err
    );
    process.exit(1);
  }
}
