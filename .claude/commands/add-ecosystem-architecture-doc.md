---
name: add-ecosystem-architecture-doc
description: Workflow command scaffold for add-ecosystem-architecture-doc in abba-mas.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-ecosystem-architecture-doc

Use this workflow when working on **add-ecosystem-architecture-doc** in `abba-mas`.

## Goal

Adds a new architectural or conceptual documentation file to the ecosystem docs.

## Common Files

- `docs/ecosystem/*.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new markdown file in docs/ecosystem/
- Write documentation for the new architecture/component
- Commit the new file with a 'docs:' prefix in the message

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.