import { spawn } from "child_process";

function runCommand(cmd: string, args: string[] = []) {
  const child = spawn(cmd, args, { stdio: "inherit" });
  child.on("exit", process.exit);
}

export const runIOS = () => runCommand("npx", ["react-native", "run-ios"]);
export const runAndroid = () =>
  runCommand("npx", ["react-native", "run-android"]);
export const runStart = () => runCommand("npx", ["react-native", "start"]);
export const runBundle = () => runCommand("npx", ["react-native", "bundle"]);
