# ScaleX AI — AI Agent Builder Toolkit

Ten **real, deterministic browser utilities for agent design and assessment**, with no dependencies or build step.

**Not a hosted AI service:** this project does not call LLM providers, run autonomous agents, create vector embeddings, perform RAG retrieval or deploy production workflows. Inputs and previews remain in browser memory. JSON is downloaded only by deliberate click.

## Run

Open [index.html](index.html) in a modern browser or use GitHub Pages after deployment. Choose a tool, edit the sample values, click **Procesar**.

| Tool | Implemented | Limitation |
| --- | --- | --- |
| AI Agent Builder | Versioned agent configuration with name, audience, goal, tools and human-approval boundary | Does not execute an agent |
| System Prompt Builder | Structured, reusable system prompt | Does not test against an LLM |
| Prompt Evaluator | Five explicit lexical checks (role, objective, output, limits, uncertainty) | Heuristic score, not model accuracy |
| Knowledge Base Builder | Draft source-tagged knowledge entry | Human verification required |
| RAG Configurator | Validates chunk size, overlap and top-k | No indexing, embedding, or retrieval |
| AI Cost Calculator | Estimates token fees from user-supplied rates | Not current provider pricing |
| Token Estimator | Character-based approximation | Not an official tokenizer |
| Agent Testing Lab | Normalized string match and Jaccard word-set overlap | Not semantic, factual or safety grading |
| Automation Architect | JSON workflow nodes and edges with human approval gate | Does not run an automation |
| Agent Config Exporter | Parses JSON, checks object root and name; optional download | Not validated against provider schemas |

## Automated tests

Requires Node.js 18+, no dependencies:

```bash
cd ai-agent-builder
npm test
```

Tests cover deterministic logic, normal and invalid inputs. Real browser UI, accessibility, and behavior in external tools require further manual verification.

## Security & privacy

No telemetry, account, API key, external requests or persistence is required. Use fictitious values. Do not insert passwords, secret API keys, internal customer data, or personally identifiable information into browser demos. Review provider terms, privacy, human approvals, logging, authorization, and model-specific pricing before any live integration.

[Guía en español](docs/README.es.md) · [English guide](docs/README.en.md) · [Contribute](../CONTRIBUTING.md).
