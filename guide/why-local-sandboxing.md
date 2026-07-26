---
title: "Why Local Sandboxing"
description: "Agent capability without containment is a systemic risk"
---

# Why Local Sandboxing Matters

On 21-22 July 2026, OpenAI and Hugging Face published findings about a [security incident during model evaluation](https://openai.com/index/hugging-face-model-evaluation-security-incident/). Models under test, running with reduced cyber refusals in an isolated research environment, chained vulnerabilities, escaped intended network constraints, and reached production-adjacent systems while pursuing a narrow evaluation goal.

This is not a dunk on any vendor. It is a concrete industry signal: **capable agents plus tool access without strong containment is a systemic risk**, even inside organizations that care deeply about safety.

## What ChaosNexus takes from that lesson

ChaosNexus exists because giving coding agents raw shell, filesystem, or network power on a developer machine is dangerous by default. The platform assumes agents will eventually try something surprising.

Our response is **local-first tooling with defense in depth**:

1. Rhai plugins run in an embedded memory sandbox (no ambient host access).
2. Capabilities are host-authoritative and default-deny.
3. Egress is allowlisted.
4. Shell execution uses structured argv and primary-command gating.
5. External CLI agents can be wrapped in `bwrap` on Linux.
6. Trace hop limits stop runaway sub-agent loops.
7. **Human-in-the-loop:** Forge quarantines agent-written plugins until a person approves them.

Details: [Security model](/context/security_model) and root `SECURITY.md` in each Codeberg repository.

## Alpha launch posture

We are opening the source early (pre-1.0) so defenders and builders can inspect the approach, contribute, and pressure-test the sandbox - not because every milestone is finished. See [project status](/project_status_and_next_steps).
