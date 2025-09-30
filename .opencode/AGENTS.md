# OpenCode Agents for SW-B3 Project

**IMPORTANT: Use BUN, not npm! All package management commands should use `bun` instead of `npm`.**

**DO NOT START DEV SERVER!** User starts the dev server manually. Never run `bun run dev` unless explicitly asked.

**ANALYZE CODEBASE FIRST!** Before writing any code, check existing patterns, libraries (we use Tailwind CSS), and follow the same approach. NEVER write custom CSS when Tailwind utility classes exist.

This repository defines task-focused agents to streamline planning, implementation, review, documentation, and testing.

Agents:

- `plan-project`: Roadmaps, milestones, ADRs, risk register
- `plan-analyse`: Repo survey, external research, dependency and risk mapping
- `mastra`: Implementation for ingestion, embeddings, LanceDB, retrieval, assembly, and agents
- `review`: Code review with targeted feedback and suggested diffs
- `documentation`: Doc updates for README, specs, examples
- `write-test`: Unit/integration tests, mocks, deterministic practices

Usage:

```bash
# Start a session with an agent
opencode --agent plan-project

# One-off task
opencode run --agent mastra "Implement LanceDB schema and retrieval module"
```

Safety:

- Repo-level `permissions.json` sets baseline rules; per-agent `permissions` apply tighter, task-specific restrictions.

Approval-first workflow:

- Each agent begins by proposing a short plan and asks for approval before proceeding.
- Per-agent `permissions` enforce tighter rules than repo defaults.
