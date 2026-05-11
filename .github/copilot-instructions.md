# GitHub Copilot Instructions

This workspace contains multiple Angular micro-frontend applications managed as a monorepo. Each app is independently buildable and uses Native Federation for module sharing.

---

## Scaffolding a New App

To scaffold a new Angular application, use the prompt file:

```
@workspace #file:.github/prompts/angular-scaffold-app.prompt.md
```

Or via the VS Code Command Palette (`⇧⌘P`) → **GitHub Copilot: Run Prompt** → select `angular-scaffold-app`.

The prompt will ask for: app name, federation role, port, remote name, feature routes, and a description — then scaffold the full project automatically.

---

## Workspace Apps

| App | Role | Port |
|-----|------|------|
| alpha-one | remote | 4301 |
| beta-one | remote | 4302 |


When adding a new app, pick the next available port and add a row to this table.

---

## Key Conventions

All code in this workspace must follow `.github/instructions/angular.instructions.md`. The highlights:

- **File names** in kebab-case
- **TypeScript** — single quotes, semi-colons, explicit return types on all methods, private properties prefixed with `_`
- **HTML** — double quotes for attribute values, properties vertically aligned in alphabetical order
- **Styling** — always use `var(--color-*)` and `var(--radius-*)` tokens; never hard-code colours or spacing; every component SCSS starts with `:host { display: block; }`
- **Reactivity** — use Angular Signals (`signal`, `computed`, `linkedSignal`) for all state; `resource()` for async fetching
- **Forms** — Signal Forms (Angular 21+); strip leading/trailing whitespace before saving
- **Routing** — lazy-load all routes via `loadComponent`
- **DI** — use `inject()` function, not constructor injection
- **No** `console.log`, commented-out code, unused imports, or hard-coded IDs

---

## Reference Files

| Topic | File |
|-------|------|
| Angular conventions | `.github/instructions/angular.instructions.md` |
| Tailwind v4 setup | `.github/skills/angular-developer/references/tailwind-css.md` |
| Tailwind templates | `.github/skills/angular-developer/references/tailwind-template.md` |
| Native Federation | `.github/skills/angular-developer/references/native-federation-template.md` |
| Routing strategies | `.github/skills/angular-developer/references/loading-strategies.md` |
| Signal forms | `.github/skills/angular-developer/references/signal-forms.md` |
| Components | `.github/skills/angular-developer/references/components.md` |
