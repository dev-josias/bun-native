import { patchMetroConfig } from "./patchMetro";
import { mirrorNodeModules } from "./mirrorNodeModules";

export async function runPostInstall(debug = false): Promise<void> {
  await patchMetroConfig();
  await mirrorNodeModules(debug);
}
