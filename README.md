<p align="center">
  <img src="https://raw.githubusercontent.com/dev-josias/bun-native/main/assets/banner.svg" width="600" alt="bun-native">
</p>

# 🌀 bun-native

> ⚡ Use **[Bun](https://bun.sh)** as a blazing-fast package manager with **React Native** projects.  
> This tool patches Metro and handles Bun-specific quirks so you can enjoy faster installs and cleaner dependencies.

---

## 🚀 Features

- ✅ Metro bundler compatibility with Bun's symlinked dependencies
- ✅ Generates a `node_modules_mirror/` for clean Metro resolution
- ✅ Patches `metro.config.js` automatically
- ✅ Wrapper commands for `run-ios`, `run-android`, and `start`
- ✅ Postinstall hook support for seamless integration

---

## 📦 Installation

Install globally via npm:

```bash
npm install -g bun-native
```

Make sure you have [Bun](https://bun.sh) installed

```bash
curl -fsSL https://bun.sh/install | bash
```

## 🧪 Usage

### ✅ Migrate an Existing React Native Project

```bash
cd your-react-native-app

# Clean up old installs
rm -rf node_modules package-lock.json yarn.lock

# Install dependencies with Bun
bun install

# Patch Metro + Generate node_modules
bun-native postinstall

# Run the app
bun-native start
bun-native run-ios
bun-native run-android
```

### 🆕 Initialize a New Project (React Native CLI)

```bash
bun-native init
```

Creates a new React Native project and installs everything using Bun.

## 🧠 How It Works

    •	Uses Bun’s .bun/install/cache to generate a flat node_modules_mirror/ layout
    •	Modifies metro.config.js to resolve modules from the mirror
    •	Wraps npx react-native commands for convenience

## 🛠 Available Commands

| Command       | Description                                             |
| ------------- | ------------------------------------------------------- |
| `init`        | Initialize a new React Native project using Bun         |
| `patch-metro` | Patch Metro to work with Bun                            |
| `postinstall` | Run postinstall to patch Metro and create mirror layout |
| `run-android` | Run `react-native run-android`                          |
| `run-ios`     | Run `react-native run-ios`                              |
| `start`       | Run `react-native start`                                |
| `bundle`      | Run `react-native bundle`                               |

## ⚠️ Known Limitations

    •	Not yet compatible with all complex native modules — but works well for most.
    •	Metro doesn’t fully support Bun’s symlink layout — hence the node_modules_mirror.

## 🤝 Contributing

Pull requests are welcome!
Ideas, templates, and bug reports are also appreciated.

## 📜 License

MIT © 2025 [Kologo B Josias Yannick](https://kologojosias.com)
