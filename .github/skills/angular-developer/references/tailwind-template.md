# Tailwind CSS v4 — Angular Templates & Patterns

> **Always use Tailwind v4 patterns.** Do NOT use `tailwind.config.js`, `@tailwind base/components/utilities`, or any v3 syntax.

---

## Setup Template

### 1. Install

```shell
ng add tailwindcss
```

Or manually:

```shell
npm install tailwindcss @tailwindcss/postcss postcss
```

### 2. `.postcssrc.json` (project root)

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### 3. Global styles — `src/styles.scss`

```scss
@use 'tailwindcss';

// Project-level CSS custom properties (design tokens) — light mode defaults
:root {
  --color-primary: oklch(55% 0.2 250);
  --color-primary-foreground: oklch(98% 0 0);
  --color-surface: oklch(100% 0 0);
  --color-surface-alt: oklch(96% 0 0);
  --color-border: oklch(88% 0 0);
  --color-text: oklch(15% 0 0);
  --color-text-muted: oklch(45% 0 0);
  --radius-base: 0.5rem;
}

// Dark mode — override tokens via system preference (unless user explicitly chose light)
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-primary: oklch(65% 0.2 250);
    --color-primary-foreground: oklch(10% 0 0);
    --color-surface: oklch(12% 0 0);
    --color-surface-alt: oklch(18% 0 0);
    --color-border: oklch(28% 0 0);
    --color-text: oklch(95% 0 0);
    --color-text-muted: oklch(60% 0 0);
  }
}

// Explicit dark override (user toggled via ThemeService)
:root[data-theme='dark'] {
  --color-primary: oklch(65% 0.2 250);
  --color-primary-foreground: oklch(10% 0 0);
  --color-surface: oklch(12% 0 0);
  --color-surface-alt: oklch(18% 0 0);
  --color-border: oklch(28% 0 0);
  --color-text: oklch(95% 0 0);
  --color-text-muted: oklch(60% 0 0);
}
```

---

## Core Layout Patterns

### App Shell — `app.html`

```html
<div class="flex min-h-screen flex-col bg-[var(--color-surface)] text-[var(--color-text)]">
  <app-header />
  <main class="flex-1 container mx-auto px-4 py-8">
    <router-outlet />
  </main>
</div>
```

### Header Component — `header.html`

> Requires `ThemeService` — see the Theme Toggle section below.

```html
<header class="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
  <div class="container mx-auto flex h-16 items-center justify-between px-4">
    <a
      class="text-lg font-semibold tracking-tight"
      routerLink="/">
      App Name
    </a>
    <nav class="flex items-center gap-6">
      <a
        class="text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        routerLink="/home"
        routerLinkActive="text-[var(--color-text)]">
        Home
      </a>
      <button
        (click)="themeService.toggle()"
        [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
        class="rounded-[var(--radius-base)] p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]"
        type="button">
        @if (themeService.isDark()) {
          <!-- Sun icon -->
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        } @else {
          <!-- Moon icon -->
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        }
      </button>
    </nav>
  </div>
</header>
```

### Header Component — `header.ts`

```ts
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly themeService = inject(ThemeService);
}
```

### Page Layout — generic feature page

```html
<section class="space-y-6">
  <div class="space-y-1">
    <h1 class="text-2xl font-bold tracking-tight">Page Title</h1>
    <p class="text-sm text-[var(--color-text-muted)]">Supporting description text.</p>
  </div>

  <div class="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
    <!-- Content -->
  </div>
</section>
```

---

## Form Patterns (Signal Forms + Tailwind)

### Input Field

```html
<div class="space-y-1.5">
  <label
    class="text-sm font-medium text-[var(--color-text)]"
    for="email">
    Email
  </label>
  <input
    class="w-full rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
    [formField]="form.fields.email"
    id="email"
    placeholder="you@example.com"
    type="email" />
  @if (form.fields.email.errors(); as errors) {
    <p class="text-xs text-red-500">{{ errors[0].message }}</p>
  }
</div>
```

### Submit Button

```html
<button
  class="inline-flex items-center justify-center rounded-[var(--radius-base)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
  [disabled]="form.submitting()"
  type="submit">
  @if (form.submitting()) {
    Saving…
  } @else {
    Save
  }
</button>
```

---

## Theme Toggle

Every app should include a `ThemeService` that lets users override the OS preference and persists the choice to `localStorage`. The service sets a `data-theme` attribute on `<html>`, which the CSS cascade resolves with higher specificity than the `@media` block.

### `core/services/theme.service.ts`

```ts
import { computed, effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>(this._getInitial());

  readonly isDark = computed(() => this._theme() === 'dark');

  private readonly _applyTheme = effect(() => {
    document.documentElement.setAttribute('data-theme', this._theme());
    localStorage.setItem('theme', this._theme());
  });

  toggle(): void {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private _getInitial(): Theme {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
```

**How it works:**
- On init, reads `localStorage` first; falls back to `matchMedia`.
- The `effect` writes `data-theme` to `<html>` and persists to `localStorage` on every change.
- `styles.scss` has three layers of specificity:
  1. `:root` — light defaults (always)
  2. `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) }` — system dark, suppressible
  3. `:root[data-theme='dark']` — explicit override, wins regardless of system

---

## Utility Patterns

### Card

```html
<div class="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
  <!-- Card content -->
</div>
```

### Badge

```html
<span class="inline-flex items-center rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]">
  Label
</span>
```

### Loading Skeleton

```html
<div class="animate-pulse space-y-3">
  <div class="h-4 w-3/4 rounded bg-[var(--color-border)]"></div>
  <div class="h-4 w-1/2 rounded bg-[var(--color-border)]"></div>
</div>
```

### Empty State

```html
<div class="flex flex-col items-center justify-center gap-3 py-16 text-center">
  <p class="text-sm text-[var(--color-text-muted)]">No items found.</p>
</div>
```

---

## Component SCSS — scoped overrides

Component SCSS files follow a token-inheritance model: always reference global CSS custom properties via `var()` rather than hard-coding colour or spacing values. This ensures automatic light/dark mode support with zero extra work at the component level.

```scss
// Every component SCSS starts with a :host block
:host {
  display: block;
}

// Reference global design tokens — do NOT hard-code colours or radii
// Correct ✓
.card {
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  color: var(--color-text);
}

// Wrong ✗ — hard-coded value breaks dark mode
.card {
  background-color: #f5f5f5;
}

// Only use when Tailwind utilities are genuinely insufficient
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
```

> **Dark mode is automatic.** Because global tokens are redefined under `@media (prefers-color-scheme: dark)` in `styles.scss`, any component that uses `var(--color-*)` tokens responds correctly without any per-component media queries.
