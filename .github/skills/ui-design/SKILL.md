---
name: tailwind-design-system
description: Build scalable design systems with Tailwind CSS v4, design tokens, component libraries, and responsive patterns. Use when creating component libraries, implementing design systems, or standardizing UI patterns.
---

# Tailwind Design System (v4) — Angular

Build production-ready design systems with Tailwind CSS v4 in Angular, including CSS-first configuration, design tokens, signal-based component variants, responsive patterns, and accessibility.

> **Note**: This skill targets Tailwind CSS v4 with Angular 19+ standalone components (the default — no explicit `standalone: true` needed) and Angular Signals. All examples use `inject()`, `input()`, `computed()`, and Signal Forms (Angular 21+).
>
> **Conventions** (per [angular.instructions.md](../../instructions/angular.instructions.md)): kebab-case file names, `app-` selector prefix, no `Component` suffix on class names, `:host { display: block; }` at the top of every component SCSS, design tokens referenced via `var(--color-*)` and `var(--radius-*)`, and shared design-system primitives placed under `src/app/shared/components/<name>/`.

## When to Use This Skill

- Creating a component library with Tailwind v4 in Angular
- Implementing design tokens and theming with CSS-first configuration
- Building responsive and accessible Angular components
- Standardizing UI patterns across an Angular monorepo
- Migrating from Tailwind v3 to v4
- Setting up dark mode with native CSS features

## Key v4 Changes

| v3 Pattern                            | v4 Pattern                                                            |
| ------------------------------------- | --------------------------------------------------------------------- |
| `tailwind.config.ts`                  | `@theme` in CSS (for animation tokens only)                           |
| `@tailwind base/components/utilities` | `@use 'tailwindcss'` (SCSS) or `@import 'tailwindcss'` (CSS)         |
| `darkMode: "class"`                   | Three-layer `:root` / `@media` / `[data-theme='dark']` (see design-tokens.md) |
| `theme.extend.colors`                 | `:root { --color-*: value }` (referenced via `var(--color-*)`)        |
| plugin-based animations               | CSS `@keyframes` in `@theme` + `@starting-style` for entry animations |

## Design Tokens

The **canonical default palette, radius, shadow, spacing, typography, and z-index tokens** for every Angular app in this workspace are defined in [references/design-tokens.md](references/design-tokens.md). Treat that file as the source of truth: copy its `Reference styles.scss` block into a new app's `src/styles.scss`, and reference tokens via `var(--color-*)`, `var(--radius-*)`, etc. — never hard-code colour, radius, or shadow values.

The Quick Start block below is a short illustrative subset; consult [design-tokens.md](references/design-tokens.md) for the complete palette (status colours, spacing, typography, shadows, z-index).

## Quick Start

```scss
/* src/styles.scss - Tailwind v4 CSS-first configuration */
@use 'tailwindcss';

/* Design tokens — light mode defaults */
:root {
  /* Semantic color tokens using OKLCH for better color perception */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);

  --color-primary: oklch(55% 0.2 250);
  --color-primary-foreground: oklch(98% 0 0);

  --color-secondary: oklch(96% 0.01 264);
  --color-secondary-foreground: oklch(14.5% 0.025 264);

  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(46% 0.02 264);

  --color-accent: oklch(96% 0.01 264);
  --color-accent-foreground: oklch(14.5% 0.025 264);

  --color-destructive: oklch(53% 0.22 27);
  --color-destructive-foreground: oklch(98% 0.01 264);

  --color-border: oklch(88% 0 0);
  --color-surface: oklch(100% 0 0);
  --color-surface-alt: oklch(96% 0 0);
  --color-text: oklch(15% 0 0);
  --color-text-muted: oklch(45% 0 0);

  /* Radius tokens */
  --radius-sm: 0.25rem;
  --radius-base: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

/* Dark mode — system preference, suppressible */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-background: oklch(14.5% 0.025 264);
    --color-foreground: oklch(98% 0.01 264);

    --color-primary: oklch(65% 0.2 250);
    --color-primary-foreground: oklch(10% 0 0);

    --color-secondary: oklch(22% 0.02 264);
    --color-secondary-foreground: oklch(98% 0.01 264);

    --color-muted: oklch(22% 0.02 264);
    --color-muted-foreground: oklch(65% 0.02 264);

    --color-accent: oklch(22% 0.02 264);
    --color-accent-foreground: oklch(98% 0.01 264);

    --color-destructive: oklch(42% 0.15 27);
    --color-destructive-foreground: oklch(98% 0.01 264);

    --color-border: oklch(28% 0 0);
    --color-surface: oklch(12% 0 0);
    --color-surface-alt: oklch(18% 0 0);
    --color-text: oklch(95% 0 0);
    --color-text-muted: oklch(60% 0 0);
  }
}

/* Dark mode — explicit user override via ThemeService */
:root[data-theme='dark'] {
  --color-background: oklch(14.5% 0.025 264);
  --color-foreground: oklch(98% 0.01 264);

  --color-primary: oklch(65% 0.2 250);
  --color-primary-foreground: oklch(10% 0 0);

  --color-secondary: oklch(22% 0.02 264);
  --color-secondary-foreground: oklch(98% 0.01 264);

  --color-muted: oklch(22% 0.02 264);
  --color-muted-foreground: oklch(65% 0.02 264);

  --color-accent: oklch(22% 0.02 264);
  --color-accent-foreground: oklch(98% 0.01 264);

  --color-destructive: oklch(42% 0.15 27);
  --color-destructive-foreground: oklch(98% 0.01 264);

  --color-border: oklch(28% 0 0);
  --color-surface: oklch(12% 0 0);
  --color-surface-alt: oklch(18% 0 0);
  --color-text: oklch(95% 0 0);
  --color-text-muted: oklch(60% 0 0);
}
    --color-surface: oklch(12% 0 0);
    --color-surface-alt: oklch(18% 0 0);
    --color-text: oklch(95% 0 0);
    --color-text-muted: oklch(60% 0 0);
  }
}
```

## Core Concepts

### 1. Design Token Hierarchy

```
Brand Tokens (abstract)
    └── Semantic Tokens (purpose)
        └── Component Tokens (specific)

Example:
    oklch(45% 0.2 260) → --color-primary → bg-primary
```

### 2. Component Architecture

```
Base styles → Variants → Sizes → States → Overrides
```

### 3. Component File Layout

Shared design-system primitives live in `shared/components/<name>/`, mirroring the per-feature structure:

```
src/app/shared/components/
  button/
    button.ts
    button.html        ← optional, inline template fine for primitives
    button.scss        ← must start with `:host { display: block; }`
    button.spec.ts
```

Feature-scoped components live under `features/<feature>/components/<name>/` per [angular.instructions.md](../../instructions/angular.instructions.md).

## Patterns

### Pattern 1: Signal-Based Component Variants (CVA)

`class-variance-authority` is framework-agnostic and works in Angular. Combine it with `input()` signals and `computed()` for variant-driven components.

```typescript
// src/app/shared/components/button/button.ts
import { Component, computed, input } from '@angular/core';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-base)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90',
        destructive: 'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:opacity-90',
        outline: 'border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)]',
        secondary: 'bg-[var(--color-surface-alt)] text-[var(--color-text)] hover:opacity-80',
        ghost: 'hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]',
        link: 'text-[var(--color-primary)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

@Component({
  selector: 'app-button',
  template: `
    <button
      [attr.disabled]="disabled() || null"
      [class]="classes()"
      [type]="type()">
      <ng-content />
    </button>
  `,
})
export class Button {
  readonly disabled = input(false);
  readonly size = input<'default' | 'icon' | 'lg' | 'sm'>('default');
  readonly type = input<'button' | 'reset' | 'submit'>('button');
  readonly variant = input<'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary'>('default');

  readonly classes = computed(() => buttonVariants({ size: this.size(), variant: this.variant() }));
}
```

```html
<!-- Usage -->
<app-button size="lg" variant="destructive">Delete</app-button>
<app-button variant="outline">Cancel</app-button>
<app-button type="submit">Save</app-button>
```

### Pattern 2: Compound Components (Angular)

Use separate standalone components for compound UI elements.

```typescript
// src/app/shared/components/card/card.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm">
      <ng-content />
    </div>
  `,
})
export class Card {}

@Component({
  selector: 'app-card-header',
  template: `<div class="flex flex-col space-y-1.5 p-6"><ng-content /></div>`,
})
export class CardHeader {}

@Component({
  selector: 'app-card-title',
  template: `<h3 class="text-2xl font-semibold leading-none tracking-tight"><ng-content /></h3>`,
})
export class CardTitle {}

@Component({
  selector: 'app-card-description',
  template: `<p class="text-sm text-[var(--color-text-muted)]"><ng-content /></p>`,
})
export class CardDescription {}

@Component({
  selector: 'app-card-content',
  template: `<div class="p-6 pt-0"><ng-content /></div>`,
})
export class CardContent {}
```

```html
<!-- Usage -->
<app-card>
  <app-card-header>
    <app-card-title>Account</app-card-title>
    <app-card-description>Manage your account settings</app-card-description>
  </app-card-header>
  <app-card-content>
    <form>...</form>
  </app-card-content>
</app-card>
```

### Pattern 3: Form Components (Signal Forms, Angular 21+)

```typescript
// src/app/features/login/login.ts
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _model = signal({ email: '', password: '' });

  readonly loginForm = form(this._model, (p) => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Invalid email address' });
    required(p.password, { message: 'Password is required' });
    minLength(p.password, 8);
  });

  onSubmit(): void {
    submit(this.loginForm, async () => {
      await this._submitLogin(this._model());
    });
  }

  private _submitLogin(_values: { email: string; password: string }): Promise<void> {
    // call your login service here
    return Promise.resolve();
  }
}
```

```html
<!-- src/app/features/login/login.html -->
<form
  (ngSubmit)="onSubmit()"
  class="space-y-4">
  <div class="space-y-1.5">
    <label
      class="text-sm font-medium text-[var(--color-text)]"
      for="email">
      Email
    </label>
    <input
      [formField]="loginForm.email"
      class="w-full rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      id="email"
      placeholder="you@example.com"
      type="email" />
    @if (loginForm.email().touched() && loginForm.email().errors().length) {
      <p class="text-xs text-[var(--color-destructive)]" role="alert">{{ loginForm.email().errors()[0].message }}</p>
    }
  </div>

  <div class="space-y-1.5">
    <label
      class="text-sm font-medium text-[var(--color-text)]"
      for="password">
      Password
    </label>
    <input
      [formField]="loginForm.password"
      class="w-full rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      id="password"
      type="password" />
    @if (loginForm.password().touched() && loginForm.password().errors().length) {
      <p class="text-xs text-[var(--color-destructive)]" role="alert">{{ loginForm.password().errors()[0].message }}</p>
    }
  </div>

  <button
    class="inline-flex w-full items-center justify-center rounded-[var(--radius-base)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    type="submit">
    Sign In
  </button>
</form>
```

### Pattern 4: Responsive Grid System

```typescript
// src/app/shared/components/grid/grid.ts
import { Component, computed, input } from '@angular/core';
import { cva } from 'class-variance-authority';

type Cols = 1 | 2 | 3 | 4 | 5 | 6;
type Gap = 'lg' | 'md' | 'none' | 'sm' | 'xl';

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: { cols: 3, gap: 'md' },
});

@Component({
  selector: 'app-grid',
  template: `<div [class]="classes()"><ng-content /></div>`,
})
export class Grid {
  readonly cols = input<Cols>(3);
  readonly gap = input<Gap>('md');
  readonly classes = computed(() => gridVariants({ cols: this.cols(), gap: this.gap() }));
}
```

```html
<!-- Usage -->
<app-grid [cols]="4" gap="lg">
  @for (product of products(); track product.id) {
    <app-product-card [product]="product" />
  }
</app-grid>
```

For advanced animation and dark mode patterns, see [references/advanced-patterns.md](references/advanced-patterns.md):

- **Pattern 5: Native CSS Animations** — dialog `@keyframes`, native `<dialog>` element with `@starting-style` and `allow-discrete` transitions
- **Pattern 6: Dark Mode** — Angular `ThemeService` with signals, `localStorage` persistence, `prefers-color-scheme` detection, and a theme-toggle component

## Utility Functions

```typescript
// src/app/shared/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

For advanced v4 CSS patterns, the full v3-to-v4 migration checklist, and complete best practices, see [references/advanced-patterns.md](references/advanced-patterns.md):

- **Custom `@utility`** — reusable CSS utilities for decorative lines and text gradients
- **Theme modifiers** — `@theme inline` (reference other CSS vars), `@theme static` (always output), `@import "tailwindcss" theme(static)`
- **Namespace overrides** — clearing default Tailwind color scales with `--color-*: initial`
- **Semi-transparent variants** — `color-mix()` for alpha scale generation
- **Container queries** — `--container-*` token definitions
- **v3→v4 migration checklist** — 10-item checklist covering config, directives, colors, dark mode, and animations
- **Best practices** — full Do's and Don'ts list

## References

- [references/design-tokens.md](references/design-tokens.md) — canonical default colour palette, radius, shadow, spacing, typography, and z-index tokens. Source of truth for every app's `src/styles.scss`.
- [references/advanced-patterns.md](references/advanced-patterns.md) — native dialog animations, dark-mode `ThemeService`, custom utilities, theme modifiers, and the v3→v4 migration checklist.
- [../../instructions/angular.instructions.md](../../instructions/angular.instructions.md) — workspace-wide Angular conventions (file naming, selectors, signal-based reactivity, signal forms, styling rules).
