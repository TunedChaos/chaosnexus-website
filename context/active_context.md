---
title: "Active Context"
description: "Documentation for Active Context"
---
# Active Context

Last updated: 2026-08-05

## Current focus: Status pass - Anvil registry + Suite enablement (2026-08-05)

Closed the long-standing "Anvil Rhai registry" backlog item and advanced Suite / contribution ops.

### Anvil

- **Live path:** `register_mcp_tool` (3/4-arg) + `load_config` (1/2-arg) work under `PluginManager` (verified via Forge `fixtures/scripts/plugins/terminal`).
- **GLOBAL_CONTEXT:** replaced `OnceLock` with replaceable `global_context()` / `set_global_context()` so rebuild/tests share the same tools map as Rhai natives.
- **Extra overloads:** `translate(plugin, key, locale, args)` and `log_info`/`log_warn`/`log_error`(tag, msg) for `translation_test`.
- **E2E:** `tests/e2e_plugins_tests.rs` targets terminal fixture + public `translation_test` (pruned time/mcp_bridge_demo no longer expected).
- **Config inheritance:** cascade + shallow-merge tests; plugin.toml forged `[permissions]` cannot become host policy; capability host-gate test.

### Suite / remotes

- CI secret **`SUITE_PUBLISH=1`** set on `Tuned_Chaos/chaosnexus`.
- `chaosnexus-suite` added to `create-public-repos.sh`, `initial-subtree-push.sh`, `publish-initial-commits.sh`.
- Workflow `.ci/workflows/ensure-public-remotes.yml` on CI `main` (dispatches failed on `local` runner in this pass - confirm `GITHUB_TOKEN` validity and runner health, then re-dispatch).
- Checklist: `launch/MANUAL_REMOTE_CHECKLIST.md` section E.

### Contribution sync

- Runbook: `launch/GITHUB_INBOUND_PR_RUNBOOK.md`.
- Local public sync: token validation, per-prefix failure aggregation, optional `only_prefix`, safer dispatch `force_push` default.

## Prior focus: Markdown for Agents + DNS-AID (2026-08-05)

Docs site agent surface for chaosnexus.ai:

- **robots.txt:** origin allows all crawlers + sitemap (AGPL comment). Cloudflare managed robots.txt may still prepend training-bot Disallows until “block training in robots.txt” is turned off in the zone dashboard.
- **llms.txt:** `vitepress-plugin-llms` emits `/llms.txt` and `/llms-full.txt`; linked from nav More + footer.
- **Link headers (RFC 8288):** Cloudflare Pages `public/_headers` advertises `api-catalog`, `describedby` (`/llms.txt`, `/.well-known/agent-index.json`), `service-doc`, and `license` on `/` and `/index.html`. Catalog at `public/.well-known/api-catalog` (RFC 9727 linkset+json).
- **DNS-AID:** HTTP index/card at `public/.well-known/agent-index.json` and `agent-card.json`. Zone DNS via `tools/launch/provision-chaosnexus-dns-aid.sh`: HTTPS `_index._agents` / `_mcp._agents`, SVCB `_docs-search._mcp._agents`, TXT index. **DNSSEC active** (DS at Spaceship / `.ai` parent; Cloudflare status `active`). isitagentready `checks.discoverability.dnsAid` **pass** with `dnssecValidated: true` (2026-08-05).
- **Markdown negotiation:** Pages Function `functions/_middleware.ts` converts HTML → markdown when `Accept` prefers `text/markdown` (`Content-Type: text/markdown`, `x-markdown-tokens`, `Vary: Accept`). Deploy via `pnpm website:deploy` (runs from `chaosnexus-website/` so Wrangler picks up `functions/`). Native Cloudflare `content_converter` needs Pro+ (`tools/launch/provision-chaosnexus-markdown-for-agents.sh`).
- **OAuth/OIDC discovery:** `public/.well-known/oauth-authorization-server`, `openid-configuration`, `oauth-protected-resource`, `jwks.json`, plus `/auth.md`. Issuer `https://chaosnexus.ai`. Public docs/MCP remain anonymous; `/oauth/{authorize,token,register,claim}` stubs document that. isitagentready `oauthDiscovery`, `oauthProtectedResource`, and `authMd` **pass** (2026-08-05). Link header advertises PRM + auth.md.
- **MCP Server Card:** `public/.well-known/mcp/server-card.json` (SEP-1649 / SEP-2127 discovery shape used by isitagentready): `serverInfo`, Streamable HTTP `url`/`transport.endpoint` → AI Search MCP, `capabilities.tools`. Linked from `api-catalog`. isitagentready `mcpServerCard` **pass** (2026-08-05).
- **Agent Skills index:** `public/.well-known/agent-skills/index.json` (Discovery RFC v0.2.0) with `$schema`, `skills[]` (`agent-auth`, `docs-search`) each having `name`, `type`, `description`, `url`, `digest` (`sha256:`). isitagentready `agentSkills` **pass** (2026-08-05).
- **Web Bot Auth:** `public/.well-known/http-message-signatures-directory` JWKS (Ed25519). Content-Type `application/http-message-signatures-directory+json`. Private key local (`chaosnexus-website/.web-bot-auth/`, gitignored); regenerate via `tools/launch/generate-chaosnexus-web-bot-auth.py`. isitagentready `webBotAuth` **pass** (2026-08-05).
- **WebMCP:** Client tools registered on load via `.vitepress/webmcp.ts` (`search_docs`, `navigate_to`, `get_discovery_info`, `get_current_page`) using `@mcp-b/webmcp-polyfill` + `registerTool`. isitagentready `webMcp` **pass** (2026-08-05).
- **AI Search:** Tuned Chaos LLC instance `chaosnexus` (website crawler of chaosnexus.ai, sitemap parse, attributions excluded). Hybrid search; public MCP/search/chat; rate limit 60/min. Public base in `.vitepress/ai-search.ts`. Provision: `AI_SEARCH_MODE=web-crawler tools/launch/provision-chaosnexus-ai-search.sh`.
- **UI:** Cmd/Ctrl+K `search-modal-snippet` web component when public endpoint is configured.
- **Docs:** `/guide/ai-agents`, `/guide/privacy` (Cloudflare AI Search processor disclosure). License meta tags on pages.
- **Follow-up:** disable managed robots.txt training Disallows if full AI crawler allow is desired; optional Pro upgrade for native edge Markdown for Agents.

## Prior focus: Full-project testing rollout (2026-08-01)

Tiered automated tests are wired at the workspace root and in CI CI.

### How to run

| Recipe | What it runs |
|--------|----------------|
| `just test-unit` | `cargo test` (Anvil, Codex, Crucible, Forge `src-tauri`, local `rhai-*`) + Forge Vitest + Tuned `uv run pytest` |
| `just test-e2e` | Forge Playwright (`MOCK_TAURI`, JSON+list reporters) |
| `just test-website-smoke` | VitePress build + website Playwright smoke (`/`, `/guide/quickstart`, `/api/rhai/`) |
| `just test` | `test-unit` then `test-e2e` then `test-website-smoke` |

Timing hint for agents: `.agents/test-timing.txt` and `chaosnexus-forge/.agents/test-timing.txt` (~252s full Forge E2E).

### CI

- Workflow: `.ci/workflows/chaosnexus-tests.yml`
- Job `unit`: always on PR/push (cargo + Vitest + Tuned pytest)
- Job `e2e`: `main` + `workflow_dispatch` (Forge Playwright + website smoke)

### Coverage matrix

| Surface | Suite |
|---------|--------|
| Anvil | `cargo test` (strong) |
| Codex | `cargo test` (config/fetch helpers) |
| Crucible | `cargo test` (model_store/sessions) |
| Forge Rust | `cargo test` in `src-tauri` |
| Local rhai-* | `cargo test` per crate under `src-tauri/crates/` |
| Forge frontend unit | Vitest (`pnpm --filter chaosnexus-forge test:unit`) |
| Forge E2E | Playwright under `chaosnexus-forge/tests/e2e/` (incl. Skills/Rules, Anvil MCP, Settings Engine, Node Palette) |
| Tuned | pytest in `chaosnexus-tuned/tests/unit/` (eval markdown under `tests/eval/`) |
| Website | Playwright smoke in `chaosnexus-website/tests/` |

### Residual gaps (explicit non-goals this pass)

- Real Tauri desktop E2E (needs display/AppImage harness)
- Tuned GPU train/eval in CI
- Monaco 0.56 migration (pinned at **0.55.1** for `edcore.main`; 0.56 needs worker/init follow-up)
- Some Forge canvas/group E2E assertions remain timing-sensitive under parallel load

## Prior focus: Latest-everywhere dependency refresh (2026-08-01)

- **pnpm:** Workspace pinned to `pnpm@11.18.0`; removed nested Forge lockfile; Forge `test` script uses `pnpm` only; removed legacy npm `tauri@0.15.0`. Node packages bumped (SvelteKit 2.70, Vite 8.2, Playwright 1.62, etc.). TypeScript held at `6.0.3` (SvelteKit peers reject TS 7).
- **Cargo:** Aligned forge/anvil `reqwest`/`notify`; majors include `rust-mcp-*` 1.x, `sea-orm` 2, `redis` 1.5, `skytable` 0.8, `hf-hub` 1.0 (Crucible model_store migrated), `sysinfo` 0.39, Tauri 2.11.5. Editions bumped to 2024 for forge + local `rhai-*`. `bincode`/`smartcore` stay pinned for `vendor/rhai-ml` (`bincode` 3.0.0 is a broken placeholder). Logos/rowan left on 0.12/0.15 pending lexer/AST migration; `lsp-types` held at 0.93 for `lsp-async-stub` 0.7. Transitive `reqwest` 0.12 remains via Polars `object_store`.
- **Python/uv:** Tuned lock upgraded (`transformers` 5.14.1, `peft` 0.20, etc.); fresh `uv sync` smoke imports OK.
- **CI pins:** Node 24, Just 1.57.0, CI runner 12.13.2, `actions/checkout@v7` / `setup-node@v7`; Zig 0.16.0 and Flatpak GNOME 50 already latest stable.
- **Verified:** Forge `check` + 211 unit tests; anvil/codex/crucible/forge `cargo check`; VitePress website build; Tuned import smoke.

## Prior focus: ChaosNexus Suite packaging + polyrepo

- **Suite prefix (2026-07-28):** workspace `chaosnexus-suite/` holds packaging recipes (stage/pack Linux AppImage, Windows zip, macOS `.app`), `manifest.toml`, and Release publish helpers. Release publish via `publish-suite-release.sh` when `SUITE_PUBLISH=1` (GitHub Releases).
- **Scripts prune:** Public `chaosnexus-scripts/plugins/` keeps only `translation_test` (+ `lib/`). Terminal moved to `chaosnexus-forge/fixtures/scripts/plugins/terminal/` for canvas parity E2E.
- **Runtime paths:** Forge `suite_paths.rs` + Anvil `CHAOSNEXUS_SCRIPTS_DIR`; AppRun / bat / macOS launcher set `CHAOSWRENCH_BIN`, Crucible, Codex, Scripts.
- **CI:** `chaosnexus-release-builds.yml` adds `suite-linux` / `suite-cross` jobs; Actions artifacts always; public Releases gated.
- **Docs:** Quickstart leads with Suite downloads; `REPOSITORY_ARCHITECTURE.md` lists suite prefix.

## Prior focus: Vhai canvas performance + GPU headroom

- **GPU paint (2026-07-28):** Removed `backdrop-blur` from `main_group` and generating overlay; NodeShell shadows only when selected/trace/error; all edge `animated: false`; `onlyRenderVisibleElements` on SvelteFlow.
- **Edge cascade:** Shared `edge_obstacles` snapshot (no `data.nodes` stamp); reconcile skips position-only updates; publish gated during spring + mid-drag; route cache + bezier-only while dragging; A* resumes on drop.
- **Physics/cycles:** Sibling-scaled physics iterations; drag-stop physics scoped to affected parents; `getCyclicEdges` via Tarjan SCC (O(V+E)).
- **Overlap:** Bubble + hard AABB unchanged on regenerate / measure / drag-stop.

## Prior focus: Bubble physics + spring settle (Vhai canvas)

- **Bubble pad (2026-07-27):** `illustrative_layout.ts` soft circular personal-space (`BUBBLE_PAD=28`) plus hard AABB; taller unknown-size floor `NODE_H=150`. Post-measure pass in `DualEditorFlowCanvas` re-runs bubble physics when measured leaf sizes still overlap.
- **Spring settle:** `layout_spring.ts` damped spring animates Regenerate / first-open to layout targets (~0.5s); live keystroke merge path does not spring. Instant `fitView` (duration 0) after settle so the camera does not tween/fight pan-drag; toolbar Fit keeps the animated camera zoom.


## Prior focus: Automated Vhai canvas visual parity

- **Regenerate / first-open (2026-07-27):** Rhai → canvas uses a semantic block-stack parser in `chaosnexus-forge/src-tauri/src/visualizer.rs` (events, for-each, labeled branches with true/false, set-variable, script calls). Tool-name prefix stripping coalesces into one `normalize tool_name` script node.
- **Layout:** `finalizeCanvasDocumentLayout(..., { force: true })` on Regenerate always recomputes function lanes (no stale X/Y merge). Branch false/completed arms drop to lower rows. Catalog `flowTypeForKind` maps kinds to eventNode/scriptNode/forEachNode/etc. for header colors.
- **Editable:** Never sets `displayOnly`; `isDisplayOnlyCanvas` stays false. Terminal fixture canvas under `chaosnexus-forge/fixtures/scripts/plugins/terminal/` is regenerated via `pnpm generate:ast-canvases` (Rust `dump_visual_canvas` example + TS lane layout).
- **Parity guards:** Rust `visualizer::` tests + `terminal_canvas_parity.test.ts`. Parser/group fix: null group x/y must become finite or xyflow stacks children at 0,0.

## Prior focus: Ubuntu 24.04 release CI image (`chaosnexus-release`)

- **Runner label (2026-07-25):** `runs-on: [chaosnexus-release]` → job image from `tools/deploy/Dockerfile.chaosnexus-release` via `chaosnexus-release:docker://…/chaosnexus-release-ci:24.04`.
- **Coolify:** Dockerfile app (context `tools/deploy`); CI compose daemon fragment `ci-compose.chaosnexus-release.yml` (register-then-daemon creates `/data/.runner`); container options in `runner-config.chaosnexus-release.example.yaml`.
- **Bootstrap script:** `ubuntu-24.04-runner-setup.sh` (also used by the Dockerfile). Flatpak runtimes skipped in image (`CHAOSNEXUS_SKIP_FLATPAK=1`); installed in `forge-linux` job.
- **SDK:** `hydrate-sdk-lfs.sh` prefers host cache `/hdd/tunedchaos/macos-sdk/MacOSX.sdk`, else local `file://` clone of CI bare repo + on-disk `git/lfs` (no Traefik HTTPS LFS). Cache seeded 2026-07-25.

## Prior focus: Zero-warning builds + AppImage strip fix

- **Warnings (2026-07-25):** Fixed rustc/clippy issues in Anvil, Crucible, Codex, Forge (incl. rhai-rowan/rhai-hir). Bumped transitive `sea-bae` 0.2.1 → 0.2.2 to drop broken `proc-macro-error2` future-incompat. Debug+release and `clippy -D warnings` clean for main crates; Forge `svelte-check` 0 warnings.
- **AppImage:** Failure was not missing linuxdeploy - Tauri's cached AppImage embeds **binutils strip 2.35**, which cannot strip modern Arch/CachyOS libs with `SHT_RELR` (`.relr.dyn` / type 0x13). Fix: `NO_STRIP=1` (+ `APPIMAGE_EXTRACT_AND_RUN=1`) in root `Justfile` and `chaosnexus-forge/Justfile` `forge-release-linux`. Verified AppImage produced (~115MB).

## Prior focus: Licenses & attributions (website)

- **Audit (2026-07-25):** All polyrepos ship `LICENSE` (AGPL-3.0). SPDX `AGPL-3.0-or-later` on Anvil/Forge/Codex/Crucible Cargo.toml, Forge `package.json`, workspace root `package.json`, and Tuned `pyproject.toml`. Scripts/Website document AGPL in README + `LICENSE`.
- **Generator fixes:** `generate-licenses.sh` now runs cargo-about for Anvil, Forge backend, **Codex**, and **Crucible**; pnpm inventories for Forge frontend and **Website** use `--filter` so they are not identical workspace dumps. Codex was previously generated as root frontend JSON and broke attributions (`.sort` on a dict).
- **Website:** `/guide/licensing` lists every component with GitHub `LICENSE` + attribution links; footer points to Licensing + Attributions; sidebar Guide includes Attributions; about pages link License sections. Static attribution pages for Scripts and Tuned. Regenerate via `pnpm generate-licenses` (Forge) then `python3 chaosnexus-forge/scripts/generate-attributions-page.py` (also hooked from `website:generate-api`).

## Prior focus: Crucible GGUF download + Forge Models

- **Tuned GGUF (2026-07-25):** Default Crucible download is [`TunedChaos/ChaosNexus_Tuned_v1-GGUF`](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1-GGUF) (Q4_K_M, published). Cache: `~/.chaosnexus/crucible/models`. Export/upload: `tools/launch/export-chaosnexus-tuned-v1-gguf.sh`, `upload-chaosnexus-tuned-v1-gguf.sh`. LoRA adapter repo remains for trainers; card cross-links to GGUF.
- **Forge Models tab:** HF token (`hf_token` in settings.toml), preset Tuned GGUF / custom Hub ID, Pull/Ensure via Crucible `/models/*`. Supervisor injects `HF_TOKEN` + `HF_HOME` (never writes token into `crucible.toml`).
- **Crucible:** `model_id` / `models_dir` / `gguf_file` config; Candle GGUF load with **Granite-aware** path (`granite.*` metadata + embedding/residual/attention/logit scales); `/models/status|pull|list`.

## Prior focus: Dockable Agent Chat + Crucible ecosystem config

- **Forge Agent Chat (2026-07-25):** Dockable right panel (default), float/undock, close (session hide) vs disable (preference). Chrome persisted via `agentChat.svelte.ts`. Sessions SSOT is **Crucible** under `<project>/.chaosnexus/crucible/sessions/` (HTTP API). Forge holds no message store.
- **Crucible supervisor:** Forge spawns/attaches Crucible; health on configurable port (default 8080); Start/Stop from chat chrome. LLM restarts do not require restarting the Forge agent UI.
- **Skills/Rules:** Dual scope `~/.chaosnexus/{rules,skills}` + `project/.chaosnexus/{rules,skills}` (project overrides). Forge Skills sidebar; Crucible context packer with Codex-style chunking (16k char windows).
- **Anvil MCP Servers UI:** Separate from Mesh. Sidebar **Anvil MCP** edits `[mcp_servers]` in `chaosnexus-anvil.toml`; Apply + Restart restarts Anvil then Crucible. Mesh stays for Rhai authors.
- **Bridge fix:** `crucible_bridge` uses Crucible `{ result }` on the configured port.

## Prior focus: Open-source alpha launch

- **Release compile pipeline (2026-07-25):** Multi-platform builds on CI `chaosnexus-release` (Ubuntu 24.04 CI image). Workflow: `.ci/workflows/chaosnexus-release-builds.yml` (`workflow_dispatch` only; Actions artifacts, no public Releases / Flathub / AUR yet). **No Codex `embed-docs` / `get-docs` on the release path** (docs stay user-defined at runtime).
  - Just entrypoints: `just anvil-release`, `just forge-release-linux`, `just forge-flatpak`, `just forge-cross`.
  - **Local/dev path (unchanged):** `just build target=… profile=debug|release features=…` and `just rebuild …` still support `get-docs` (Codex fetch) and `embed` (Codex `--features embed-docs`). Separate from release staging.
  - **Anvil:** Linux native + Windows zigbuild + macOS universal → `artifacts/anvil/`. Draft unpublished AUR PKGBUILD: `chaosnexus-anvil/packaging/aur/`.
  - **Forge Linux:** Tauri `--bundles deb,rpm,appimage` + Flatpak (`just forge-flatpak`, manifest under `chaosnexus-forge/packaging/flatpak/`) → `artifacts/forge/linux/`. Draft unpublished AUR PKGBUILD: `chaosnexus-forge/packaging/aur/`.
  - **Forge Win/Mac cross:** host binaries via zigbuild; CI soft-fail. Still not signed MSI/DMG.
  - **Zig linker warning (2026-07-26):** `ignoring deprecated linker optimization setting '1'` is rustc passing `-O` to Zig ([rust-lang/rust#158192](https://github.com/rust-lang/rust/issues/158192)). Anvil/Forge Justfiles set `-Alinker_messages` on zigbuild RUSTFLAGS only (Windows + macOS); native Linux mold builds unchanged.
  - Runner kit: `cargo-zigbuild`, `zig`, `llvm-lipo`, mingw sync lib, macOS SDK, AppImage tooling, `flatpak-builder` + GNOME Platform/Sdk 50.
- Alpha-launch pack in progress: GitHub public repositories + Sponsors, VitePress launch pages (roadmap, status, licensing, support, why-local-sandboxing), social drafts under `launch/social/`.
- Topology: sibling component checkouts → GitHub public repositories (see `REPOSITORY_ARCHITECTURE.md`).
- **AI disclosure (2026-07-23):** FLOSS forge ToU updates on generative AI. Project discloses assisted authorship via root/`AI_ASSISTANCE.md` (per polyrepo), VitePress `/guide/ai-assistance`, README/CONTRIBUTING pointers. Wording is generic (no vendor/model names). Framing: human-directed review, not mostly unreviewed vibe-code.
- **Pages prune:** `chaosnexus-website.yml` runs `tools/launch/prune-cloudflare-pages.sh` after publish and keeps the newest 5 production deployments for project `chaosnexus`.
- **Naming (2026-07-23):** Dropped leftover `docs:*` / `deploy.yml` labels. Root scripts are `website:*`; CI workflow is `.ci/workflows/chaosnexus-website.yml` (job `website`). Cloudflare Pages project remains `chaosnexus` (chaosnexus.ai).
- **Actions LFS (2026-07-23):** `CI_TOKEN` is present; website job still failed until git-lfs was upgraded past Bookworm 3.3.x and URL-scoped `http.*.extraheader` from `actions/checkout` was cleared (duplicate Authorization → CF 400 on object GET).
- **Actions deploy green (2026-07-23 ~21:36 EDT):** `chaosnexus-website.yml` run 359 succeeded on `d918a7c4` (LFS hydrate + Corepack pnpm 11 + python3 + Pages publish). Live https://chaosnexus.ai returns 200; contribute lists `chaosnexus-tuned`.
- **Live site (2026-07-23 ~22:28 UTC):** Redeployed VitePress via `pnpm website:deploy` (Pages production `a184d59b`). Verified https://chaosnexus.ai: home tagline **Early alpha launch**, contribute lists crucible + scripts, `/og-image.png` 200. Custom domain lagged `chaos-nexus.pages.dev` briefly after deploy.
- **CI runner labels:** workspace Actions (`chaosnexus-website.yml`, public sync) use `runs-on: [local]` on FM-3900X (`node:22-bookworm`, not catthehacker).
- **Public polyrepos reset (2026-07-25 20:51:48 UTC):** Full orphan republish with matched timestamps via `MATCHED_COMMIT_DATE` (`chore: refresh public polyrepos as a clean alpha snapshot`): anvil, forge, website, codex, tuned, crucible, scripts. public force-push via `tools/launch/publish-initial-commits.sh` to GitHub. Do not run non-force `github-sync` until ready to rebaseline (dispatch `force_push=true` only when intentionally replacing the orphan with subtree history).
- **Sync policy:** alpha orphan publish = public GitHub (`tools/launch/publish-initial-commits.sh`); ongoing = CI public sync → GitHub.
- **Branding:** `images/chaosnexus-crucible/` committed in CI workspace (parity with other `images/chaosnexus-*` packs); Crucible polyrepo ships `assets/banner.png` + `assets/icon.png`.
- **Wording:** public launch called **alpha launch** (not soft launch).
- **Component guides (2026-07-23):** VitePress guides added for [Crucible](/guide/chaosnexus-crucible/about) and [Scripts](/guide/chaosnexus-scripts/about) (about / getting-started / usage / config or layout); sidebar under Component Guides.
- **Social embeds (2026-07-23):** VitePress head now ships Open Graph + Twitter Card tags with absolute `https://chaosnexus.ai/og-image.png` (1200x630 brand banner), apple-touch-icon, and theme-color so Discord / X / Telegram / Slack link previews show ChaosNexus branding.
- Granite 4.1-8B LoRA eval gated before announce; weights not on Hugging Face until ≥70% Anvil rubric (alpha) / ≥90% (full-version claim).
- **Docs drift (2026-07-24):** roadmap M1 marks Tuned + public repos + public sync done; status drops Visibility item; Tuned row says eval in progress.
- **Eval iter-1 (2026-07-24):** studio checkpoint scored mean **0.444** on 18 prompts (Pass/Partial/Fail); smoke failed on 4 and 5. **Hold** HF + social. Scores in `chaosnexus-tuned/tests/eval_scores_iter1.md`; retrain outline `chaosnexus-tuned/TRAIN_ITER2.md`. Announce drafts stay Variant A/B ready under `launch/social/` but unpublished.
- **Eval iter-2 (2026-07-24):** ROCm PEFT checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter2-rocm` mean **0.472**; smoke Fail (tool-call spam). **Hold** again. Scores `chaosnexus-tuned/tests/eval_scores_iter2.md`; iter-3 outline in `TRAIN_ITER2.md`.
- **Train iter-3 (2026-07-24):** Goldens-only injector `inject_iter3_api_goldens.py` (exact Anvil signatures, no augmented ShareGPT); plan `chaosnexus-tuned/TRAIN_ITER3.md`; checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter3-rocm` mean **0.556** (smoke clear). **Hold** HF/announce (&lt;0.70).
- **Public freeze (2026-07-24):** public sync was paused for announce orphan; **resumed same day** - `.ci/workflows/public-sync workflow` live again (dispatch `force_push` for rebaseline only). Private CI SSOT continues.
- **Train iter-4 (2026-07-24):** Hard-negative goldens (`inject_iter4_api_goldens.py`); checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter4-rocm` mean **0.389** (smoke Fail; regression vs 0.556). **Hold**. Codex still deferred. Prefer iter-3 adapter as interim baseline until iter-5 shrinks upsample.
- **Train iter-5 (2026-07-24):** Small positive goldens (700 rows); checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter5-rocm` mean **0.722** but smoke Fail on prompt 4. **Hold** HF/announce until smoke clears; Codex deferred.
- **Train iter-6 (2026-07-24):** Focus 4/6/8/17; checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter6-rocm` mean **0.833**, smoke **CLEAR**. **Alpha gate PASS.**
- **Train iter-7 (2026-07-24):** Over-focus×45 collapsed floor; mean **0.611**, smoke Fail. Do not ship.
- **Train iter-8 (2026-07-24):** Continue from iter-6 + mild focus 12/1/2/7/8; checkpoint `~/.unsloth/studio/outputs/chaosnexus-tuned-iter8-rocm` mean **0.944**, smoke **CLEAR**. **Full-version gate PASS (≥0.90).**
- **Release name (2026-07-24):** **ChaosNexus Tuned v1** live at https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1 (Anvil mean 0.944). Alpha announce live (docs site, GitHub repositories, tunedchaos.dev, LinkedIn, X/Twitter). Public trees re-orphaned then live public sync resumed. Codex deferred; desktop packaging CI compile matrix next (see release compile pipeline above). Hero logo scaled down on mobile viewports. ChaosCanvas: compact height + tap-to-explore so mobile page scroll is not captured by Vue Flow.
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
