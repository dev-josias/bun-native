import { patchMetroConfig } from "./patchMetro";
import { mirrorNodeModules } from "./mirrorNodeModules";

export async function runPostInstall() {
  await patchMetroConfig();
  await mirrorNodeModules();
}
