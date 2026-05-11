---
mode: 'agent'
description: 'Scaffold a new Angular standalone component following project conventions.'
---

Generate a new Angular standalone component using the Angular CLI.

**Requirements to gather before generating:**
- Component name (kebab-case, e.g. `user-profile`)
- Target directory (e.g. `src/app/features/users`)
- Does this component need routing (`RouterLink`, `RouterOutlet`)? Yes / No
- Does it need inputs or outputs? Describe them.
- SCSS or inline styles?

**Rules to follow:**
- Use `ng generate component <name> --standalone` via the CLI.
- Use signal-based `input()` and `output()` — not `@Input()` / `@Output()` decorators.
- Use `@if`, `@for`, `@switch` control flow — not structural directives.
- File name must be in kebab-case. Class name must NOT have a `Component` suffix (e.g., `UserProfile`, not `UserProfileComponent`). Selector must use the `app-` prefix (e.g., `app-user-profile`).
- Place shared design-system primitives in `src/app/shared/components/<name>/`; place feature-scoped components in `src/app/features/<feature>/components/<name>/`.
- All methods must have explicit return types.
- Private properties start with `_`.
- No `console.log`. No commented-out code. No unused imports.
- HTML attributes must be vertically aligned, alphabetically ordered, click handlers first.
- The component SCSS file must start with `:host { display: block; }`. Reference design tokens via `var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--space-*)` — never hard-code colour, radius, shadow, or spacing values. Pair coloured backgrounds with their matching `*-foreground` token. The canonical token palette lives in `.github/skills/ui-design/references/design-tokens.md`.
- After generating, run `ng build` and fix any errors before finishing.
