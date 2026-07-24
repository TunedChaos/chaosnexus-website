---
title: "Active Context"
description: "Documentation for Active Context"
---
# Active Context

Last updated: 2026-07-24

## Current focus: Open-source alpha launch

- Alpha-launch pack in progress: Codeberg polyrepos (contribute primary), GitHub mirrors + Sponsors, VitePress launch pages (roadmap, status, licensing, support, why-local-sandboxing), social drafts under `launch/social/`.
- Topology: private monorepo SSOT → Codeberg polyrepos → GitHub mirrors (see `REPOSITORY_ARCHITECTURE.md`).
- **AI disclosure (2026-07-23):** Codeberg ToU update on generative AI. Project discloses assisted authorship via root/`AI_ASSISTANCE.md` (per polyrepo), VitePress `/guide/ai-assistance`, README/CONTRIBUTING pointers. Wording is generic (no vendor/model names). Framing: human-directed review, not mostly unreviewed vibe-code.
- **Pages prune:** `chaosnexus-website.yml` runs `tools/launch/prune-cloudflare-pages.sh` after publish and keeps the newest 5 production deployments for project `chaosnexus`.
- **Naming (2026-07-23):** Dropped leftover `docs:*` / `deploy.yml` labels. Root scripts are `website:*`; Forgejo workflow is `.forgejo/workflows/chaosnexus-website.yml` (job `website`). Cloudflare Pages project remains `chaosnexus` (chaosnexus.ai).
- **Actions LFS (2026-07-23):** `FORGEJO_TOKEN` is present; website job still failed until git-lfs was upgraded past Bookworm 3.3.x and URL-scoped `http.*.extraheader` from `actions/checkout` was cleared (duplicate Authorization → CF 400 on object GET).
- **Actions deploy green (2026-07-23 ~21:36 EDT):** `chaosnexus-website.yml` run 359 succeeded on `d918a7c4` (LFS hydrate + Corepack pnpm 11 + python3 + Pages publish). Live https://chaosnexus.ai returns 200; contribute lists `chaosnexus-tuned`.
- **Live site (2026-07-23 ~22:28 UTC):** Redeployed VitePress via `pnpm website:deploy` (Pages production `a184d59b`). Verified https://chaosnexus.ai: home tagline **Early alpha launch**, contribute lists crucible + scripts, `/og-image.png` 200. Custom domain lagged `chaos-nexus.pages.dev` briefly after deploy.
- **Forgejo runner labels:** monorepo Actions (`chaosnexus-website.yml`, `codeberg-sync.yml`) use `runs-on: [local]` on FM-3900X (`node:22-bookworm`, not catthehacker).
- **Public polyrepos reset (2026-07-23 22:48:40 UTC):** Full orphan republish with matched timestamps via `MATCHED_COMMIT_DATE`: anvil `9550979`, forge `c7cd64a`, website `3276a89`, codex `8f67660`, tuned `fcb7c36`, crucible `031a8cf`, scripts `0ae7f7b`. Contribute page lists all seven. Crucible = LLM interface; Tuned = datasets/eval/train pipeline (weights out of git).
- **Sync policy:** alpha orphan publish = Codeberg-only (`tools/launch/publish-initial-commits.sh`); ongoing = Forgejo `codeberg-sync.yml` → Codeberg; GitHub mirrors only.
- **Branding:** `images/chaosnexus-crucible/` committed in Forgejo monorepo (parity with other `images/chaosnexus-*` packs); Crucible polyrepo ships `assets/banner.png` + `assets/icon.png`.
- **Wording:** public launch called **alpha launch** (not soft launch).
- **Component guides (2026-07-23):** VitePress guides added for [Crucible](/guide/chaosnexus-crucible/about) and [Scripts](/guide/chaosnexus-scripts/about) (about / getting-started / usage / config or layout); sidebar under Component Guides.
- **Social embeds (2026-07-23):** VitePress head now ships Open Graph + Twitter Card tags with absolute `https://chaosnexus.ai/og-image.png` (1200x630 brand banner), apple-touch-icon, and theme-color so Discord / X / Telegram / Slack link previews show ChaosNexus branding.
- Granite 4.1-8B LoRA eval gated before announce; weights not on Hugging Face until ≥70% Anvil rubric (alpha) / ≥90% (full-version claim).
- **Docs drift (2026-07-24):** roadmap M1 marks Tuned + public repos + Codeberg sync done; status drops Visibility item; Tuned row says eval in progress.
- **Eval iter-1 (2026-07-24):** studio checkpoint scored mean **0.444** on 18 prompts (Pass/Partial/Fail); smoke failed on 4 and 5. **Hold** HF + social. Scores in `chaosnexus-tuned/tests/eval_scores_iter1.md`; retrain outline `chaosnexus-tuned/TRAIN_ITER2.md`. Announce drafts stay Variant A/B ready under `launch/social/` but unpublished.
- **Eval iter-2 (2026-07-24):** ROCm PEFT checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter2-rocm` mean **0.472**; smoke Fail (tool-call spam). **Hold** again. Scores `chaosnexus-tuned/tests/eval_scores_iter2.md`; iter-3 outline in `TRAIN_ITER2.md`.
- **Train iter-3 (2026-07-24):** Goldens-only injector `inject_iter3_api_goldens.py` (exact Anvil signatures, no augmented ShareGPT); plan `chaosnexus-tuned/TRAIN_ITER3.md`; checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter3-rocm` mean **0.556** (smoke clear). **Hold** HF/announce (&lt;0.70).
- **Public freeze (2026-07-24):** Codeberg sync workflow disabled (`.forgejo/workflows/codeberg-sync.yml.disabled`); polyrepos reorphaned to single `chore: initial public alpha-launch commit` (Codeberg + GitHub mirrors). Private Forgejo SSOT continues.
- **Train iter-4 (2026-07-24):** Hard-negative goldens (`inject_iter4_api_goldens.py`); checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter4-rocm` mean **0.389** (smoke Fail; regression vs 0.556). **Hold**. Codex still deferred. Prefer iter-3 adapter as interim baseline until iter-5 shrinks upsample.
- **Train iter-5 (2026-07-24):** Small positive goldens (700 rows); checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter5-rocm` mean **0.722** but smoke Fail on prompt 4. **Hold** HF/announce until smoke clears; Codex deferred.
- **Train iter-6 (2026-07-24):** Focus 4/6/8/17; checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter6-rocm` mean **0.833**, smoke **CLEAR**. **Alpha gate PASS.**
- **Train iter-7 (2026-07-24):** Over-focus×45 collapsed floor; mean **0.611**, smoke Fail. Do not ship.
- **Train iter-8 (2026-07-24):** Continue from iter-6 + mild focus 12/1/2/7/8; checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter8-rocm` mean **0.944**, smoke **CLEAR**. **Full-version gate PASS (≥0.90).**
- **Release name (2026-07-24):** **ChaosNexus Tuned v1** live at https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1 (Anvil mean 0.944). Alpha announce live (docs site, Codeberg polyrepos, tunedchaos.dev, LinkedIn). Public trees re-orphaned as announce-day initial commits. Codex deferred; desktop packaging next.
- Absolute paths scrubbed from example `chaosnexus-anvil/chaoswrench.toml`; `artifacts/` untracked.

### Prior focus retained below

### Architecture flow diagram refresh (complete)

- Refreshed the ChaosNexus architectural and ChaosNexus Anvil mechanics flow charts in `docs/guide/architecture.md`.

### Remote UI removal (complete)

- Dropped `tauri-remote-ui` (Rust plugin + npm package); all IPC now uses `@tauri-apps/api` directly.
- Removed Vite `remote_ui_ws` / `remote_ui_disconnect` proxies; Playwright mocks alias `@tauri-apps/api/core` and `@tauri-apps/api/event` only.

### ChaosNexus Anvil plugin disable + PowerShell shell (complete)

- **`ChaosNexus Anvil_disable_plugin`**: built-in MCP tool moves `plugins/<name>/` → `plugins/disabled/<name>/` and reloads the engine (matches existing discovery skip for the `disabled` folder).
- **`run_command`**: PowerShell/pwsh use `-NoProfile -NonInteractive -Command`; POSIX shells keep `-c` (`shell_exec.rs`).

### Menu-bar + sidebar UI polish (complete)

- **Removed status-bar `WORKSPACE:`**: the top-right metadata now shows only the theme.
- **`THEME:` is a shortcut**: the status-bar theme label is a button with the tooltip "Change theme in settings." that dispatches `open-settings-modal` with `detail.tab = "appearance"`, deep-linking straight to Settings > Appearance (`SettingsModal.svelte` reads the optional tab).
- **Removed the menu-bar Themes dropdown**: `MenuBarMenus.svelte` no longer renders the hierarchical Themes menu; `MenuBar.svelte` dropped its themes keyboard-navigation, `topLevelMenus` entry, and `Alt+T` accelerator (theme selection lives solely in Settings > Appearance). The native-menu `theme_*` handler/`handleSelectTheme` remain.
- **Workspace anchor**: `RegistrySidebar.svelte` renames "Workspace Anchor" → "Workspace" and renders the path as a read-only, select-all input plus a Copy button (`copyToClipboard`) that confirms with "Copied!".
- **Tests**: `settings-ui.spec.ts` asserts the THEME shortcut opens the Appearance tab; new `workspace-anchor.spec.ts` covers the read-only field + copy; theme visual baselines regenerated (Themes menu removed from the bar).

### Canvas polish (complete)

Illustrative bundled canvases use spacing-first layout, Unreal-style boundary pins, typed connectors, display-only parse isolation, and header-aware edge routing.

- **Layout SSOT**: `illustrative_layout.ts`: `NODE_W=260`, `GAP_X=40`, row/column-aware `deOverlapNodes()`, `col()`/`row()` grid; terminal/db_test lifecycle rows on grid
- **Boundary pins (Unreal-style)**: `NodeShell.svelte` renders exec pins as near-white right-pointing triangles on the left (inputs) / right (outputs), stacked above the circular typed data pins on the same sides; handle ids unchanged
- **Edge geometry**: `edge_routing.ts` `routeEdge()`: clean horizontal cubic bezier as primary; auto-falls back to obstacle-avoiding A* (`routeEdgePath()`) only when sampled bezier points cross a node body or group-header band. Kills the old top/bottom-pin zig-zag.
- **Pathfinder**: binary min-heap open set, span-scaled iteration budget (fallback router only)
- **Typed wire colors**: `edge_visuals.ts` resolves the wire color from the *specific* source pin's `dataType` (`sourceDataTypeFor()` → `pinRoleFromDataType` → `--pin-<role>`), overriding the catalog default. `VhaiNode` derives pin colors the same way from `data.pins`. Builder declares intentional `Script` return types (terminal/db_test keys/query → `array`, ws_connect → `object`). Exec stays `--pin-exec` white/solid; data dashed 3px.
- **Round-trip**: `buildCanvasMetadata` preserves explicit per-node `pins` overrides
- **Display-only parse**: `parseRhaiToFlow` skips Rhai `[NODE:]` anchors when `displayOnly: true`
- **Tests**: E2E overlap (all 12 plugins), group-header wire avoidance, stroke width, connected pins, hover, typed data-wire color (array=violet); Vitest for layout, edge routing (bezier vs A* fallback), edge visuals (typed colors), pathfinder

### Security fast-follow + illustrative canvas wiring (complete)

- **`get_env` hard error**: Denied env access now raises a Rhai error instead of returning `""`
- **Grid identity fix**: `run_lifecycle_grid` / `try_execute_grid` wrap `execute_assembly_grid` in `with_plugin_context`
- **Display-only sidecars**: all 12 bundled sample plugins ship `displayOnly: true` illustrative graphs; Rhai remains runtime SSOT
- Generator: `ChaosNexus Forge/scripts/generate-illustrative-canvases.ts`
- Builder SSOT: `ChaosNexus Forge/src/lib/dual_editor/illustrative_canvas_builder.ts`

## Prior: Security hardening (LITL/HITL)

Implemented phased security model per [security_model.md](./security_model.md):

- **Phase 1**: Threat model + capability taxonomy documented
- **Phase 2**: Fail-closed quarantine (`.pending/`), `ChaosNexus Anvil_create_plugin` staging-only, ChaosNexus Forge approval UI
- **Phase 3**: Per-plugin `[capabilities]` in `plugin.toml`, native gating, `CURRENT_PLUGIN` identity
- **Phase 4**: Identity binding, KV/global namespacing, reserved events, recursion budget
- **Phase 5**: Rhai engine hardening (`eval` disabled, limits, module resolver)
- **Phase 6**: Secret broker for `get_env`, OS sandbox documentation
- **Phase 3.5 (DX follow-up)**: Per-plugin immutable `CONFIG` constant injected into every Rhai scope (`config_inject.rs`). Delivers scoped `CONFIG.cvars` + granted `CONFIG.secrets` so scripts authenticate via `CONFIG` instead of ambient `get_env`. Event hooks now also run under `CURRENT_PLUGIN`.

## Key paths

- Staging: `chaosnexus-scripts/.pending/<plugin_name>/` (logical scripts root)
- Live plugins: `chaosnexus-scripts/plugins/<plugin_name>/`
- Illustrative sidecars: `chaosnexus-scripts/plugins/<plugin_name>/.chaosnexus-forge/<script>.canvas.json`
- Pending manifest: `ChaosNexus Forge.pending.toml` inside each staging folder

## LLM workflow (post-hardening)

1. `ChaosNexus Anvil_create_plugin` -> writes `.pending/`, returns PENDING
2. Human approves in ChaosNexus Forge -> promotes to `plugins/` with granted capabilities
3. `ChaosNexus Anvil_reload_plugins` -> re-list tools -> invoke new tool
