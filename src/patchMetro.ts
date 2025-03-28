import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export function patchMetroConfig() {
  const configPath = path.resolve("metro.config.js");

  if (!fs.existsSync(configPath)) {
    console.error(chalk.red("❌ metro.config.js not found."));
    return;
  }

  const patch = `
const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: new Proxy({}, {
      get: (_, name) => path.join(__dirname, 'node_modules_mirror', name)
    })
  },
  watchFolders: [path.resolve(__dirname, 'node_modules_mirror')],
};
`;

  fs.writeFileSync(configPath, patch);
  console.log(
    chalk.green(
      "✅ metro.config.js patched successfully for Bun compatibility."
    )
  );
}
