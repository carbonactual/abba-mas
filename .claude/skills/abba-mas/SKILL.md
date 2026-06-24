```markdown
# abba-mas Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and workflows used in the `abba-mas` TypeScript codebase. It covers file naming, import/export conventions, commit message standards, testing patterns, and the primary documentation workflow. This guide is intended to help contributors quickly align with the project's established practices.

## Coding Conventions

### File Naming
- Use **kebab-case** for all file names.
  - Example: `user-service.ts`, `message-handler.test.ts`

### Import Style
- Use **relative imports** for all modules.
  - Example:
    ```typescript
    import { parseUser } from './user-utils';
    ```

### Export Style
- Use **named exports** only.
  - Example:
    ```typescript
    // user-utils.ts
    export function parseUser(data: any) { /* ... */ }
    export const USER_ROLE = 'admin';
    ```

### Commit Messages
- Follow **conventional commit** style.
- Use prefixes such as `docs:`, `config:`, `schema:`.
- Keep commit messages concise (average ~47 characters).
  - Example:
    ```
    docs: add overview to ecosystem architecture docs
    ```

## Workflows

### Add Ecosystem Architecture Doc
**Trigger:** When you want to document a new aspect or component of the ecosystem architecture.  
**Command:** `/new-ecosystem-doc`

1. Create a new markdown file in `docs/ecosystem/` using kebab-case for the filename.
   - Example: `docs/ecosystem/message-bus.md`
2. Write clear and concise documentation for the new architecture/component.
3. Commit the new file with a message prefixed by `docs:`.
   - Example:
     ```
     docs: add message bus architecture doc
     ```

## Testing Patterns

- Test files use the `*.test.*` naming pattern.
  - Example: `user-service.test.ts`
- The specific testing framework is not defined in the codebase.
- Place test files alongside the modules they test or in a dedicated test directory.

## Commands

| Command             | Purpose                                                      |
|---------------------|--------------------------------------------------------------|
| /new-ecosystem-doc  | Start the workflow for adding a new ecosystem architecture doc |

```