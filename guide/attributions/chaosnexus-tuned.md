<div v-pre>

# ChaosNexus Tuned - Attributions

ChaosNexus Tuned is the dataset, evaluation, and fine-tuning pipeline. Source code is **AGPL-3.0-or-later** (see `LICENSE` in [chaosnexus-tuned](https://codeberg.org/TunedChaos/chaosnexus-tuned)).

## Project license

Pipeline scripts and tooling in this repository are AGPL-3.0-or-later. Published adapters and GGUF artifacts on Hugging Face carry their own model cards and license metadata; always read the Hub card for the artifact you download.

## Base models and Hub artifacts

Fine-tunes and GGUF exports are derived from third-party base models. Those base models (and any redistributed weights) remain under their upstream licenses. Example defaults used by ChaosNexus:

- Adapter: [TunedChaos/ChaosNexus_Tuned_v1](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1)

- GGUF: [TunedChaos/ChaosNexus_Tuned_v1-GGUF](https://huggingface.co/TunedChaos/ChaosNexus_Tuned_v1-GGUF)

Confirm the base-model license on each Hub card before redistribution.

## Training stack (Python)

Tuned depends on common ML packages (for example torch, transformers, peft, unsloth, pandas). Install-time licenses come from those packages and their transitive dependencies. Prefer inspecting `chaosnexus-tuned/pyproject.toml` and your local virtualenv license metadata when redistributing a training environment.

Inference runtime third-party crates are listed under [Crucible attributions](./chaosnexus-crucible.md).

</div>
