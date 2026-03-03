# Copilot Agent Modes

This project operates under two distinct agent modes. Determine the active mode based on the file being modified or the task being performed.
Always ask for clarification if unsure which mode applies to a given change. Before acting as a maintainer, confirm the mode with the user and explain the risks.

---

## 🔧 Maintainer Mode

**Trigger:** Activated when working on core/shared infrastructure code.

**Applies to:**
- `package.json` — dependency management
- `next.config.ts` - Next.js configuration
- `utils/` — shared utilities (e.g., `formBuilder.ts`)
- `models/` — types, interfaces, schemas
- `hooks/` — shared/reusable hooks
- `lib/` — core libraries, API clients, providers
- `components/ui/` — base/primitive UI components
- `middleware.ts`, `next.config.ts`, `tailwind.config.ts`
- Any file annotated with `maintainer mode` in a comment

**Rules:**
1. **Do not introduce breaking changes** to existing public APIs or function signatures without explicit approval.
2. **Preserve backward compatibility** — all changes must be additive or refactors that maintain the same contract.
3. **Strict TypeScript** — no `any` types unless absolutely necessary and documented. Use generics where appropriate.
4. **Document decisions** — add JSDoc or inline comments explaining *why* a pattern exists, not just *what* it does.
5. **No site-specific logic** — core code must remain generic and reusable. Never import from site-specific directories.
6. **Test impact awareness** — when modifying core code, identify all downstream consumers and flag potential breakage.
7. **Minimal dependencies** — avoid adding new external dependencies to core modules. Prefer native solutions.
8. **Review-first mindset** — suggest changes as proposals, explain trade-offs, and ask for confirmation before applying.
9. **Code annotation** — mark core files with a `/* maintainer mode */` comment block near the top of the file.

---

## 🚀 Developer Mode

**Trigger:** Activated when working on site-specific implementation code.

**Applies to:**
- `app/` — pages, layouts, route handlers (site-specific)
- `components/` (excluding `components/ui/`) — feature/page-specific components
- `configs/` — site-specific configuration files
- `styles/` — site-specific styling
- `content/` — CMS content, static data
- `public/` — assets
- Form configs, page-specific hooks, feature modules

**Rules:**
1. **Use core utilities** — always leverage existing core utilities (e.g., `formBuilder`) and base components. Do not reinvent them.
2. **Follow established patterns** — look at existing implementations for reference before creating new ones.
3. **Be productive** — prioritize shipping. Suggest complete, working implementations.
4. **Component composition** — build features by composing base UI components, not by creating new primitives.
5. **Type safety** — use the types defined in `models/` rather than creating inline types. If a new type is needed, suggest adding it to `models/` (this triggers Maintainer Mode for that specific change).
6. **Configuration-driven** — prefer declarative configs over imperative code (e.g., use `formBuilder` field configs instead of manual form construction).
7. **Keep it scoped** — site-specific code should not modify or monkey-patch core utilities. If a core change is needed, flag it and switch to Maintainer Mode.
8. **Translations** — use the translation function `t()` for all user-facing strings.
9. **Code annotation** — mark site-specific files with a `/* developer mode */` comment block near the top if helpful for clarity.

---

## Mode Escalation

When working in **Developer Mode** and a change to core infrastructure is required:
1. **Stop and flag it** — clearly state: "⚠️ This requires a Maintainer Mode change."
2. **Propose the core change separately** — describe what needs to change and why.
3. **Wait for approval** before modifying core code.
4. **Then resume Developer Mode** for the site-specific implementation.

---

## How to Signal Mode in Code

Use a comment at the top of the file (after imports) to signal the intended mode:

```typescript
/* maintainer mode */
```

```typescript
/* developer mode */
```

This helps both human developers and Copilot understand the governance level of the file.