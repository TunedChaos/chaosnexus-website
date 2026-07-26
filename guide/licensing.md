---
title: "Licensing"
description: "AGPLv3-or-later and commercial licensing for ChaosNexus"
---

# Licensing

## Open source: AGPL-3.0-or-later

ChaosNexus is released under the **GNU Affero General Public License v3.0 or later**.

That means you can use, study, modify, and share the software under AGPL terms, including the network-use copyleft obligations that apply when you run a modified version as a network service.

License text: [gnu.org/licenses/agpl-3.0](https://www.gnu.org/licenses/agpl-3.0.html) and the `LICENSE` file in each repository.

## Components and SPDX

Every public ChaosNexus polyrepo ships AGPL-3.0-or-later. Manifests use the SPDX id `AGPL-3.0-or-later` where the package format supports it.

| Component | Codeberg | `LICENSE` | Third-party inventory |
|-----------|----------|-----------|------------------------|
| Anvil | [chaosnexus-anvil](https://codeberg.org/TunedChaos/chaosnexus-anvil) | [LICENSE](https://codeberg.org/TunedChaos/chaosnexus-anvil/src/branch/main/LICENSE) | [Attributions](/guide/attributions/chaosnexus-anvil) |
| Forge | [chaosnexus-forge](https://codeberg.org/TunedChaos/chaosnexus-forge) | [LICENSE](https://codeberg.org/TunedChaos/chaosnexus-forge/src/branch/main/LICENSE) | [Backend](/guide/attributions/chaosnexus-forge-backend) · [Frontend](/guide/attributions/chaosnexus-forge-frontend) |
| Codex | [chaosnexus-codex](https://codeberg.org/TunedChaos/chaosnexus-codex) | [LICENSE](https://codeberg.org/TunedChaos/chaosnexus-codex/src/branch/main/LICENSE) | [Attributions](/guide/attributions/chaosnexus-codex) |
| Crucible | [chaosnexus-crucible](https://codeberg.org/TunedChaos/chaosnexus-crucible) | [LICENSE](https://codeberg.org/TunedChaos/chaosnexus-crucible/src/branch/main/LICENSE) | [Attributions](/guide/attributions/chaosnexus-crucible) |
| Scripts | [chaosnexus-scripts](https://codeberg.org/TunedChaos/chaosnexus-scripts) | [LICENSE](https://codeberg.org/TunedChaos/chaosnexus-scripts/src/branch/main/LICENSE) | [Attributions](/guide/attributions/chaosnexus-scripts) |
| Tuned | [chaosnexus-tuned](https://codeberg.org/TunedChaos/chaosnexus-tuned) | [LICENSE](https://codeberg.org/TunedChaos/chaosnexus-tuned/src/branch/main/LICENSE) | [Attributions](/guide/attributions/chaosnexus-tuned) |
| Website | [chaosnexus-website](https://codeberg.org/TunedChaos/chaosnexus-website) | [LICENSE](https://codeberg.org/TunedChaos/chaosnexus-website/src/branch/main/LICENSE) | [Attributions](/guide/attributions/chaosnexus-website) |

Full index: [Attributions & third-party licenses](/guide/attributions/).

### Models and Hub artifacts

Weights, adapters, and GGUF files published on Hugging Face are **not** the AGPL source tree. Each Hub card states the applicable model license and base-model terms. Crucible only downloads and runs what you configure; Tuned produces fine-tunes under those upstream constraints.

## Commercial license

Tuned Chaos offers a **commercial license** for organizations that need to redistribute or embed ChaosNexus (or derivatives) in proprietary products **without** AGPL obligations.

Typical fit:

- Shipping ChaosNexus inside a closed-source appliance or SaaS control plane
- OEM / white-label redistribution
- Enterprises with policies that cannot accept AGPL for their distribution model

Contact: **commercial@tunedchaos.com**. See also [Support](/guide/support) for Sponsors and donation options. Company site: [tunedchaos.com](https://tunedchaos.com).

AGPL community use remains free. Commercial licensing funds continued open development.

## Contributor grant

By contributing to ChaosNexus you grant Tuned Chaos a perpetual, unrestricted, worldwide license to distribute your contribution under both open-source and commercial licenses, while you retain your rights. See [CONTRIBUTING](https://codeberg.org/TunedChaos/chaosnexus-anvil/src/branch/main/CONTRIBUTING.md) (also present in each component repository).

If you do not wish to grant these rights, do not submit contributions.

## Generative AI assistance

Some code in this project was generated with assistance from AI. Humans at Tuned Chaos directed architecture, review, and maintenance. See [AI assistance disclosure](/guide/ai-assistance).
