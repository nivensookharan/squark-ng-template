# Angular Scaffold App Prompt

**File:** `.github/prompts/angular-scaffold-app.prompt.md`

This is a Copilot agent prompt that scaffolds a complete, production-ready Angular application from scratch. It handles project creation, Tailwind CSS v4 setup, Native Federation configuration, core layout scaffolding, lazy-loaded routing, and a build verification — all in one guided flow.

---

## How to Use

Open GitHub Copilot Chat in VS Code and run:

```
/angular-scaffold-app
```

Or reference it explicitly:

```
Use the prompt in .github/prompts/angular-scaffold-app.prompt.md to scaffold a new Angular app
```

The agent will ask you six questions before it does anything. Answer them and it takes care of the rest.

---

## The Six Questions Explained

### 1. Application name

> The folder name and Angular project name. Must be **kebab-case** (lowercase words separated by hyphens).

| Example input | Result |
|---|---|
| `my-feature-app` | Creates a folder `my-feature-app/`, Angular project named `my-feature-app` |
| `user-profile` | Creates `user-profile/` |

**Rule:** No spaces, no uppercase, no underscores.

---

### 2. Federation role

> How this application participates in a **Module Federation** architecture.

| Option | What it means | When to use |
|---|---|---|
| `remote` | This app is a **micro-frontend** loaded by a host | Building a feature app that will be injected into a shell *(default)* |
| `host` | This app is the **shell** that loads remotes | Building the main application container |
| `standalone` | No federation — a regular Angular app | Building an isolated application with no micro-frontend requirements |

**Default is `remote`** — this template is designed primarily as a micro-frontend building block.

---

### 3. Dev port

> The `localhost` port the app runs on during development.

| Role | Default port | Why |
|---|---|---|
| `remote` | `4201` | Leaves `4200` free for the host |
| `host` | `4200` | Standard Angular dev port |
| `standalone` | `4200` | Standard Angular dev port |

If you have **multiple remotes** in the same workspace, increment the port for each one: `4201`, `4202`, `4203`, etc.

---

### 4. Remote name

> The identifier used inside `federation.config.js` and the host's `federation.manifest.json`. This is how the **host refers to this app** when loading it.

| Example | Where it appears |
|---|---|
| `user-profile` | `federation.config.js` → `name: 'user-profile'` |
| `user-profile` | Host manifest → `"user-profile": "http://localhost:4201/remoteEntry.json"` |

**Default:** Same as the application name. Only change this if the app name and the federation identifier need to differ.

---

### 5. Initial feature routes

> A comma-separated list of route names to scaffold. Each becomes a **lazy-loaded standalone component** with its own folder under `src/app/features/`.

| Example input | What gets created |
|---|---|
| `home` | `src/app/features/home/home.ts` + route at `/home` |
| `home, dashboard, settings` | Three feature components + three routes |

The **first route** in the list becomes the default redirect (i.e., navigating to `/` redirects there).

---

### 6. Description

> One sentence about what this application does. Used for context — it helps the agent name things appropriately and write relevant placeholder content.

Example: `'Manages user profiles and account preferences for the platform.'`

---

## What Gets Built

After you answer the questions, the agent runs these steps automatically:

```
Step 1  Gather answers from you
Step 2  Create the Angular project (detects ng CLI, falls back to npx)
Step 3  Install & configure Tailwind CSS v4
Step 4  Set up Native Federation as remote or host (skipped if standalone)
Step 5  Scaffold header, footer, feature components, and lazy routes
Step 6  Run ng build and fix any errors
Step 7  Verify a 12-point checklist before finishing
```

---

## Example Conversations

### Example 1 — Remote micro-frontend with two routes

```
You:    Use the scaffold app prompt

Agent:  What is the application name?
You:    product-catalogue

Agent:  Federation role — remote, host, or standalone?
You:    remote

Agent:  Dev port?
You:    (press Enter to accept 4201)

Agent:  Remote name?
You:    (press Enter — defaults to product-catalogue)

Agent:  Initial feature routes?
You:    home, products, product-detail

Agent:  Description?
You:    Displays and filters the product catalogue for the e-commerce platform.
```

**Result:**
- Angular project `product-catalogue/` created
- Tailwind v4 configured with design token variables
- `@angular-architects/native-federation` installed, configured as a remote on port `4201`
- `federation.config.js` exposes `./Component` and `./Routes`
- Header + footer layout components created
- Three lazy-loaded feature components: `home`, `products`, `product-detail`
- Navigating to `/` redirects to `/home`
- Build passes clean

---

### Example 2 — Host shell

```
You:    Scaffold a new Angular app

Agent:  What is the application name?
You:    shell-app

Agent:  Federation role?
You:    host

Agent:  Dev port?
You:    (press Enter to accept 4200)

Agent:  Remote name?
You:    shell-app

Agent:  Initial feature routes?
You:    home

Agent:  Description?
You:    The main shell application that loads micro-frontends.
```

**Result:**
- Angular project `shell-app/` created
- Tailwind v4 configured
- Native Federation configured as a **host** on port `4200`
- `public/federation.manifest.json` created (empty — add remotes here later)
- Header + footer + home feature created
- Build passes clean

To register a remote in the host later, add an entry to `public/federation.manifest.json`:

```json
{
  "product-catalogue": "http://localhost:4201/remoteEntry.json"
}
```

Then add a lazy route in `app.routes.ts`:

```ts
import { loadRemoteModule } from '@angular-architects/native-federation';

{
  path: 'products',
  loadChildren: () =>
    loadRemoteModule('product-catalogue', './Routes').then((m) => m.routes),
}
```

---

### Example 3 — Standalone app (no federation)

```
You:    Scaffold a standalone Angular app called internal-tools with routes: dashboard, reports

Agent:  (asks questions)
You:    internal-tools / standalone / 4200 / internal-tools / dashboard, reports / Internal tooling dashboard.
```

**Result:**
- Angular project with Tailwind v4
- No federation packages installed
- `dashboard` and `reports` lazy-loaded feature components
- Header + footer + routing wired up
- Build passes clean

---

## File Structure After Scaffolding

```
<app-name>/
├── .postcssrc.json                   ← Tailwind v4 PostCSS config
├── federation.config.js              ← Native Federation config (remote/host only)
├── angular.json
├── package.json
└── src/
    ├── styles.scss                   ← Tailwind import + CSS custom property tokens
    ├── main.ts                       ← initFederation() bootstrap (federation only)
    ├── bootstrap.ts                  ← bootstrapApplication() (federation only)
    └── app/
        ├── app.ts                    ← Root component (imports Header, Footer, RouterOutlet)
        ├── app.html                  ← App shell layout
        ├── app.routes.ts             ← Lazy-loaded routes
        ├── layout/
        │   ├── header/header.ts      ← Header component with nav links
        │   └── footer/footer.ts      ← Footer component
        └── features/
            └── <route-name>/
                └── <route-name>.ts   ← One folder per feature route
```

---

## Related Files

| File | Purpose |
|---|---|
| [angular-component.prompt.md](angular/angular-component.prompt.md) | Add a new standalone component after scaffolding |
| [angular-service.prompt.md](angular/angular-service.prompt.md) | Add a service with signal-based state |
| [angular-form.prompt.md](angular/angular-form.prompt.md) | Add a form (Signal Forms for v21+) |
| [angular-route.prompt.md](angular/angular-route.prompt.md) | Add a new lazy route with guard/resolver |
| [../instructions/angular.instructions.md](../instructions/angular.instructions.md) | Coding conventions applied throughout |
| [../skills/angular-developer/references/tailwind-template.md](../skills/angular-developer/references/tailwind-template.md) | Tailwind v4 UI patterns reference |
| [../skills/angular-developer/references/native-federation-template.md](../skills/angular-developer/references/native-federation-template.md) | Native Federation setup reference |
