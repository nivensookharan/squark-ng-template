---
mode: 'agent'
description: 'Scaffold a new production-ready Angular application with Tailwind CSS v4, Native Federation (remote), core layout, routing, and project conventions.'
---

You are scaffolding a new Angular application from this template. Follow every step in order. Do not skip steps. Run `ng build` after completing the setup and fix any errors before finishing.

---

## Step 1 — Gather Requirements

> **HARD STOP** — Do not run any commands or create any files until you have collected every required answer from the user. Ask all questions together in a single message.

Ask the user for the following before proceeding:

| # | Question | Required | Default |
|---|---|---|---|
| 1 | **Application name** (kebab-case, e.g. `my-feature-app`) | Yes | — |
| 2 | **Federation role**: `remote`, `host`, or `standalone` (no federation) | Yes | `remote` |
| 3 | **Dev port** | Yes | `4201` for remote · `4200` for host/standalone |
| 4 | **Remote name** (used in `federation.config.js` `name` field) | Yes | same as app name |
| 5 | **Initial feature routes** to scaffold (comma-separated, e.g. `home, dashboard`) | Yes | `home` |
| 6 | **Description** — one sentence about what this app does | Yes | — |

Once all answers are received, confirm back to the user with a summary of the values that will be used, then proceed to Step 2.

---

## Step 2 — Create the Angular Project

### 2a. Check for existing Angular CLI installation

```shell
ng version
```

- If installed → `ng new <app-name> --routing --style=scss --standalone --ssr=false --defaults`
- If not installed → `npx @angular/cli@latest new <app-name> --routing --style=scss --standalone --ssr=false --defaults`

The `--ssr=false` and `--defaults` flags suppress all interactive prompts. Do **not** run `ng new` without these flags — it will block waiting for user input.

### 2b. Move into the project directory

```shell
cd <app-name>
```

---

## Step 3 — Install & Configure Tailwind CSS v4

Read `.github/skills/angular-developer/references/tailwind-css.md`, `.github/skills/angular-developer/references/tailwind-template.md`, and `.github/skills/ui-design/references/design-tokens.md` before proceeding.

```shell
ng add tailwindcss
```

If `ng add tailwindcss` is unavailable, perform the manual setup:

```shell
npm install tailwindcss @tailwindcss/postcss postcss
```

Create `.postcssrc.json` in the project root:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Replace the contents of `src/styles.scss` with the **`Reference styles.scss` block from [`.github/skills/ui-design/references/design-tokens.md`](../skills/ui-design/references/design-tokens.md)**. That file is the single source of truth for the default palette (surfaces, brand, status), radius, shadow, spacing, typography, and z-index tokens — along with the three-layer dark-mode setup. Do not hand-roll a token block; copy it verbatim so every app stays consistent.

If this app needs brand-specific extensions, add them to the `:root` block, the `@media (prefers-color-scheme: dark) :root:not([data-theme='light'])` block, **and** the `:root[data-theme='dark']` block, after the canonical tokens (see the "Extending the Palette" section of `design-tokens.md`).

---

## Step 4 — Set Up Native Federation (skip if `standalone`)

Read `.github/skills/angular-developer/references/native-federation-template.md` before proceeding.

```shell
npm install @angular-architects/native-federation --save-dev
ng add @angular-architects/native-federation --project <app-name> --type <remote|host> --port <port> --skip-confirmation
```

### Remote — update `federation.config.js`

Replace the generated `exposes` block with:

```js
exposes: {
  './Component': './src/app/app.ts',
  './Routes': './src/app/app.routes.ts',
},
```

Ensure `name` matches the **remote name** from Step 1.

### Host — create `public/federation.manifest.json`

```json
{}
```

_(Remotes are added here later as `"remote-name": "http://localhost:<port>/remoteEntry.json"`)_

---

## Step 5 — Scaffold Core Structure

Use the Angular CLI for all file generation. Follow `.github/instructions/angular.instructions.md` for all code conventions.

### 5a. Generate core layout components

```shell
ng generate component layout/header --standalone
```

### 5b. Update `src/app/app.html`

```html
<div class="flex min-h-screen flex-col bg-[var(--color-surface)] text-[var(--color-text)]">
  <app-header />
  <main class="container mx-auto flex-1 px-4 py-8">
    <router-outlet />
  </main>
</div>
```

### 5c. Update `src/app/app.ts` — import layout components + RouterOutlet

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
```

### 5d. Scaffold each feature route from Step 1

For each route name provided (e.g. `home`), create the following structure:

```
features/
  <route-name>/
    components/   ← presentational sub-components for this feature
    models/       ← interfaces and types specific to this feature
    services/     ← feature-scoped services
    <route-name>.ts
    <route-name>.html
    <route-name>.scss
    <route-name>.spec.ts
```

Run the CLI to generate the container component, then create the subdirectories:

```shell
ng generate component features/<route-name>/<route-name> --standalone
mkdir -p src/app/features/<route-name>/components
mkdir -p src/app/features/<route-name>/models
mkdir -p src/app/features/<route-name>/services
```

Create a `README.md` placeholder inside each empty subdirectory so they are tracked by Git:

```shell
echo '# Components' > src/app/features/<route-name>/components/README.md
echo '# Models' > src/app/features/<route-name>/models/README.md
echo '# Services' > src/app/features/<route-name>/services/README.md
```

Update the generated `<route-name>.scss` to start with a `:host` block and reference global design tokens:

```scss
:host {
  display: block;
}
```

> **SCSS inheritance rule:** Never hard-code colours, radii, or spacing in component SCSS. Always use `var(--color-*)` and `var(--radius-*)` tokens. Dark mode is handled globally in `styles.scss` — no per-component media queries are needed.

### 5e. Update `src/app/app.routes.ts` — lazy-load each feature

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '<first-route>',
  },
  // Repeat for each feature route:
  {
    path: '<route-name>',
    loadComponent: () =>
      import('./features/<route-name>/<route-name>').then((m) => m.<RouteName>),
  },
  {
    path: '**',
    redirectTo: '<first-route>',
  },
];
```

### 5f. Add navigation links to the header

Use `routerLink` and `routerLinkActive` for each route. Follow the header template in `.github/skills/angular-developer/references/tailwind-template.md`.

---

## Step 6 — Update Root `.vscode` Configuration

Update the **workspace-root** `.vscode` files so the new app can be served, built, and debugged directly from VS Code without navigating into the app directory.

> If a `.vscode` file does not yet exist at the root, create it. If it already exists, **merge** the new entries into the existing arrays — do not replace the whole file.

### 6a. `.vscode/tasks.json`

Add the following tasks, using `options.cwd` to scope them to the app subdirectory:

```json
{
  "label": "<app-name>: serve",
  "type": "shell",
  "command": "ng serve",
  "isBackground": true,
  "options": {
    "cwd": "${workspaceFolder}/<app-name>"
  },
  "problemMatcher": {
    "owner": "typescript",
    "pattern": "$tsc",
    "background": {
      "activeOnStart": true,
      "beginsPattern": { "regexp": "Changes detected" },
      "endsPattern": { "regexp": "bundle generation (complete|failed)" }
    }
  }
},
{
  "label": "<app-name>: build",
  "type": "shell",
  "command": "ng build",
  "options": {
    "cwd": "${workspaceFolder}/<app-name>"
  },
  "problemMatcher": "$tsc"
},
{
  "label": "<app-name>: test",
  "type": "shell",
  "command": "ng test",
  "isBackground": true,
  "options": {
    "cwd": "${workspaceFolder}/<app-name>"
  },
  "problemMatcher": {
    "owner": "typescript",
    "pattern": "$tsc",
    "background": {
      "activeOnStart": true,
      "beginsPattern": { "regexp": "Changes detected" },
      "endsPattern": { "regexp": "bundle generation (complete|failed)" }
    }
  }
}
```

### 6b. `.vscode/launch.json`

Add a Chrome debug configuration that pre-launches the serve task and opens the correct port:

```json
{
  "name": "<app-name>: serve",
  "type": "chrome",
  "request": "launch",
  "preLaunchTask": "<app-name>: serve",
  "url": "http://localhost:<port>/"
}
```

### 6c. `.vscode/extensions.json`

Merge the following into the `recommendations` array (skip any already present):

```json
"angular.ng-template",
"bradlc.vscode-tailwindcss",
"firsttris.vscode-jest-runner"
```

---

## Step 7 — Verify the Build

```shell
ng build --configuration development
```

- If there are errors, analyse and fix them.
- Do not proceed until the build is clean.

---

## Step 8 — Checklist Before Finishing

Confirm all of the following before marking the task complete:

- [ ] `ng build` passes with no errors
- [ ] Tailwind v4 is configured — `@use 'tailwindcss'` in `styles.scss`, `.postcssrc.json` present
- [ ] No `tailwind.config.js` exists
- [ ] `styles.scss` has light-mode tokens under `:root`, system-dark overrides under `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) }`, and explicit-dark overrides under `:root[data-theme='dark']`
- [ ] `federation.config.js` is present and `name` is correct (if federation was set up)
- [ ] Both `./Component` and `./Routes` are exposed (if remote)
- [ ] `public/federation.manifest.json` exists (if host)
- [ ] All feature routes are lazy-loaded via `loadComponent`
- [ ] Each feature folder contains `components/`, `models/`, and `services/` subdirectories
- [ ] All component SCSS files start with `:host { display: block; }` and use `var(--color-*)` tokens — no hard-coded colours
- [ ] Header component exists and is imported in `app.ts`
- [ ] Root `.vscode/tasks.json` has `<app-name>: serve`, `<app-name>: build`, and `<app-name>: test` tasks
- [ ] Root `.vscode/launch.json` has a `<app-name>: serve` Chrome debug configuration
- [ ] Root `.vscode/extensions.json` includes `angular.ng-template`, `bradlc.vscode-tailwindcss`, and `firsttris.vscode-jest-runner`
- [ ] No `console.log` statements
- [ ] No unused imports
- [ ] All methods have return types
- [ ] File names are in kebab-case

---

## Reference Files

| Topic | File |
|---|---|
| Coding conventions | `.github/instructions/angular.instructions.md` |
| Tailwind v4 setup | `.github/skills/angular-developer/references/tailwind-css.md` |
| Tailwind templates | `.github/skills/angular-developer/references/tailwind-template.md` |
| Native Federation | `.github/skills/angular-developer/references/native-federation-template.md` |
| Routing strategies | `.github/skills/angular-developer/references/loading-strategies.md` |
| Signal forms | `.github/skills/angular-developer/references/signal-forms.md` |
| Components | `.github/skills/angular-developer/references/components.md` |
