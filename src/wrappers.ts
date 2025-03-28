import { spawn } from "child_process";

function runCommand(cmd: string, args: string[] = []): void {
  const child = spawn(cmd, args, { stdio: "inherit" });
  child.on("exit", (code) => process.exit(code ?? 0));
}

export const runIOS = (): void =>
  runCommand("npx", ["react-native", "run-ios"]);
export const runAndroid = (): void =>
  runCommand("npx", ["react-native", "run-android"]);
export const runStart = (): void =>
  runCommand("npx", ["react-native", "start"]);
export const runBundle = (): void =>
  runCommand("npx", ["react-native", "bundle"]);
