---
applyTo: '**/*.ts,**/*.html,**/*.scss'
---

# Angular Developer Instructions

## General

- Always check the Angular version in `package.json` before writing code — features differ significantly between versions.
- Follow Angular's official style guide for all generated code.
- After generating code, run `ng build` to confirm there are no build errors before proceeding.
- Use the Angular CLI to scaffold components, services, directives, pipes, and routes.
- Remove unused import statements and keep imports organised.
- File names must be in kebab-case.
- All methods must have explicit return types.
- Use single quotes in TypeScript. Double quotes only in HTML attributes.
- Terminate all statements with semi-colons.
- Private properties must start with an underscore `_`.
- No `console.log` statements checked in.
- No hard-coded IDs.
- No commented-out code.

## Components

- Use signal-based `input()` and `output()` for component inputs and outputs.
- Use `@if`, `@for`, `@switch` control flow syntax — not `*ngIf`, `*ngFor`, `*ngSwitch`.
- Keep component templates focused; extract complex logic into services or computed signals.
- Properties/attributes in HTML must be vertically aligned, in alphabetical order, in the following order:
  1. Click handlers
  2. Angular binding properties
  3. Non-binding properties

## Reactivity

- Use Angular Signals (`signal`, `computed`, `linkedSignal`) for all state management in Angular 17+ projects.
- Use `resource()` for async data fetching into signal state.
- Use `effect()` sparingly — only for logging or third-party DOM manipulation; never to sync state.
- Prefer `computed()` over `effect()` for derived state.

## Forms

- Angular v21+ new forms: use **Signal Forms** exclusively.
- Older projects / existing forms: match the current form strategy (template-driven or reactive).
- Always strip leading/trailing whitespace on form input fields before saving or submitting.

## Services & Dependency Injection

- Use `inject()` function — not constructor injection — for new code in Angular 14+ projects.
- Register singleton services with `providedIn: 'root'`.
- Use `InjectionToken` for non-class dependencies.
- Order of methods: public, protected, private.

## Routing

- Prefer lazy-loaded routes using `loadComponent` or `loadChildren`.
- Use `ResolveFn` to pre-fetch data before route activation.
- Use `CanMatchFn` / `CanActivateFn` functional guards — not class-based guards.

## Styling

- Use component-scoped SCSS (`styleUrl`) — avoid global styles for component-specific rules.
- All component SCSS files must begin with a `:host { display: block; }` block.
- **Design tokens are the single source of truth** for colour, radius, shadow, spacing, typography, and z-index. The canonical palette lives in [`.github/skills/ui-design/references/design-tokens.md`](../skills/ui-design/references/design-tokens.md). When scaffolding a new app, copy the `Reference styles.scss` block from that file into the project's `src/styles.scss`.
- Always reference design tokens via `var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--space-*)` etc. — never hard-code colour, radius, shadow, or spacing values. This ensures automatic light/dark mode support.
- Always pair a coloured background token with its matching `*-foreground` token (e.g., `bg-[var(--color-primary)] text-[var(--color-primary-foreground)]`) to guarantee accessible contrast.
- Dark mode uses three CSS layers in `styles.scss` — do **not** add per-component dark-mode rules:
  1. `:root` — light defaults
  2. `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) }` — system dark, suppressible
  3. `:root[data-theme='dark']` — `ThemeService` explicit override, highest specificity
- App-specific token extensions must be added to **all three** dark-mode layers in that app's `src/styles.scss`.
- Limit use of `!important`.
- When integrating Tailwind CSS, use the `@angular/build:application` builder and follow the official Tailwind v4 + Angular setup.

## Feature Module Structure

Each feature route must follow this folder structure:

```
features/
  <feature-name>/
    components/   ← presentational sub-components used only within this feature
    models/       ← interfaces and types specific to this feature
    services/     ← feature-scoped services (not registered in root unless needed)
    <feature-name>.ts
    <feature-name>.html
    <feature-name>.scss
    <feature-name>.spec.ts
```

- The top-level `<feature-name>.ts` is the smart/container component for the route.
- Place reusable, cross-feature code in a shared `core/` or `shared/` directory, not inside a feature folder.

## Navigation / Header

- When generating a top navigation or header component, always include a **light/dark mode toggle switch**.
- The toggle must call a `ThemeService` (or equivalent signal-based service) that applies `'light'` or `'dark'` to `document.documentElement` as a class and persists the preference in `localStorage`.
- The toggle switch itself must be a standalone presentational component (`app-theme-toggle`) located at `src/app/shared/components/theme-toggle/`.
- Use an accessible `<button>` with `role="switch"`, `aria-checked` bound to the current theme signal, and a visible label (screen-reader text is acceptable via `sr-only`).
- The toggle icon must swap between a sun and moon SVG — no external icon library dependency.
- The dark mode CSS class (`dark`) must be added to `<html>` so that the `:root[class~="dark"]` or `@media` token strategy in `styles.scss` activates correctly.

## Accessibility

- For interactive patterns (Accordion, Listbox, Combobox, Menu, Tabs, Toolbar, Tree, Grid), implement proper ARIA roles and attributes.
- Style ARIA state attributes (`aria-selected`, `aria-expanded`, etc.) in CSS rather than toggling classes.

## Testing

- Use **Vitest** for unit tests.
- Use `TestBed` for component and service testing.
- Use component harnesses for robust DOM interaction in tests.
- Use `RouterTestingHarness` for navigation tests.
- Use **Cypress** for end-to-end tests.
