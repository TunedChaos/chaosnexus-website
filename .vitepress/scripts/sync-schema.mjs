// docs/.vitepress/scripts/sync-schema.mjs
//
// Regenerates the committed SSOT schema artifact used by the documentation
// generator. It invokes the ChaosNexus Anvil engine (the single source of truth)
// with `--schema-stdout` and writes the resulting JSON to
// `docs/.vitepress/chaos_schema.json`.
//
// This is a developer/CI step run via `pnpm schema:generate`. The docs build
// itself (`pnpm website:build`) consumes the committed JSON so it never requires
// a Rust toolchain.

import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
// scriptDir = <repo>/docs/.vitepress/scripts -> repo root is three levels up.
const repoRoot = resolve(scriptDir, "../../..");
const chaoswrenchManifest = resolve(repoRoot, "chaosnexus-anvil", "Cargo.toml");
const schemaOut = resolve(scriptDir, "..", "chaos_schema.json");

console.log("[sync-schema] Generating engine schema via ChaosNexus Anvil...");

const result = spawnSync(
  "cargo",
  ["run", "--quiet", "--manifest-path", chaoswrenchManifest, "--", "--schema-stdout"],
  { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 }
);

if (result.error) {
  console.error("[sync-schema] Failed to spawn cargo:", result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  console.error("[sync-schema] cargo exited with status", result.status);
  if (result.stderr) console.error(result.stderr);
  process.exit(1);
}

let json = result.stdout.trim();

// Validate before committing the artifact.
try {
  const parsed = JSON.parse(json);
  const moduleCount = Object.keys(parsed.modules ?? {}).length;
  const fnCount = Object.values(parsed.modules ?? {}).reduce(
    (sum, mod) => sum + (mod.functions?.length ?? 0),
    0
  );
  json = JSON.stringify(parsed, null, 2);
  console.log(`[sync-schema] Parsed ${moduleCount} module(s), ${fnCount} function(s).`);
} catch (err) {
  console.error("[sync-schema] Engine output was not valid JSON:", err.message);
  process.exit(1);
}

writeFileSync(schemaOut, `${json}\n`, "utf-8");
console.log(`[sync-schema] Wrote ${schemaOut}`);
