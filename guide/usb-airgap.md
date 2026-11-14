---
title: "USB and airgap"
description: "Run ChaosNexus Suite from a USB stick; Path 2 models stay separate."
---

# USB and airgap

Use current Suite installers on a portable stick without baking GGUF into the package.

## Downloads

Canonical artifacts: [GitHub Releases - chaosnexus-suite](https://github.com/TunedChaos/chaosnexus-suite/releases) (`suite-v*`).

| Platform | Artifact |
|----------|----------|
| Linux | `ChaosNexus_Suite-<ver>-x86_64.AppImage` |
| Linux (portable) | `ChaosNexus_Suite-<ver>-x86_64-linux.tar.gz` (always published beside the AppImage) |
| Windows | `ChaosNexus_Suite-<ver>-windows-x86_64.zip` |
| macOS | `.app` / DMG |

Suite software is **AGPL-3.0-or-later**. GGUF weights are **Path 2** (not in the installer): size and UX keep models out of the default Suite. Hub cards cover base IBM Granite terms and Tuned packaging notices. See [Licensing](/guide/licensing).

## Suggested stick layout

```
ChaosNexus-Stick/
  linux/
    ChaosNexus_Suite-<ver>-x86_64.AppImage
    ChaosNexus_Suite-<ver>-x86_64-linux.tar.gz
  windows/
    ChaosNexus_Suite-<ver>-windows-x86_64.zip
  macos/
    ChaosNexus_Suite-<ver>-macos-universal.dmg
  models/
    ChaosNexus_Tuned_v1-Q4_K_M.gguf
```

## Launch

1. **Linux:** `chmod +x` the AppImage and run it. Without FUSE, extract `*-x86_64-linux.tar.gz` and run `ChaosNexus_Suite.AppDir/AppRun`.
2. **Windows:** extract the zip and run `ChaosNexus-Suite.bat`.
3. **macOS:** open the `.app` (Gatekeeper may need right-click → Open for unsigned alpha).

## Path 2 models (airgap)

1. On a networked host, download Tuned GGUF from Hugging Face (`TunedChaos/ChaosNexus_Tuned_v1-GGUF`), read the Hub card, and accept applicable terms.
2. Copy the `.gguf` onto the stick (for example `models/`).
3. Offline, choose that local file in Settings → Models, or place it under the host cache (`~/.chaosnexus/crucible/models/` today).

Do not expect the Suite AppImage/zip/`.app` to contain weights.

## Config location (0.8.5)

Preferences and caches still live under the **host user home** (`~/.chaosnexus/…`). Stick-local data/models roots are planned for a later release; see the Suite README **Next** note.

## Unsigned alpha

Windows SmartScreen and macOS Gatekeeper may warn until signing lands. Prefer Open anyway / right-click Open for testing.

## Next steps

* [Quickstart](/guide/quickstart)
* [Licensing](/guide/licensing) (AGPL Suite; Hub terms for models)
* [chaosnexus-suite README](https://github.com/TunedChaos/chaosnexus-suite#usb-and-airgap-portable-stick)
