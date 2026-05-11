# Tailwind Design System: Advanced Patterns (Angular)

Advanced Tailwind CSS v4 patterns for Angular including animations, dark mode theming, custom utilities, theme modifiers, namespace overrides, and the v3-to-v4 migration checklist.

## Pattern 5: Native CSS Animations (v4)

```scss
/* In src/styles.scss - native @starting-style for entry animations */
@theme {
  --animate-dialog-in: dialog-fade-in 0.2s ease-out;
  --animate-dialog-out: dialog-fade-out 0.15s ease-in;
}

@keyframes dialog-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes dialog-fade-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-0.5rem);
  }
}

/* Native popover animations using @starting-style */
[popover] {
  transition:
    opacity 0.2s,
    transform 0.2s,
    display 0.2s allow-discrete;
  opacity: 0;
  transform: scale(0.95);
}

[popover]:popover-open {
  opacity: 1;
  transform: scale(1);
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

```typescript
// src/app/shared/components/dialog/dialog.ts — using native <dialog> element
import { Component, ElementRef, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <dialog
      #dialogRef
      (close)="closed.emit()"
      class="rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg backdrop:bg-black/50 open:animate-[dialog-fade-in_0.2s_ease-out]">
      <ng-content />
    </dialog>
  `,
})
export class Dialog {
  readonly closed = output<void>();

  private readonly _dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogRef');

  open(): void {
    this._dialogRef().nativeElement.showModal();
  }

  close(): void {
    this._dialogRef().nativeElement.close();
  }
}
```

```html
<!-- Usage -->
<app-dialog #myDialog (closed)="onClosed()">
  <h2 class="text-lg font-semibold text-[var(--color-text)]">Confirm Action</h2>
  <p class="mt-2 text-sm text-[var(--color-text-muted)]">Are you sure?</p>
  <div class="mt-4 flex justify-end gap-2">
    <app-button (click)="myDialog.close()" variant="outline">Cancel</app-button>
    <app-button (click)="confirm()" variant="destructive">Delete</app-button>
  </div>
</app-dialog>

<app-button (click)="myDialog.open()">Open Dialog</app-button>
```

## Pattern 6: Dark Mode with Angular Service

```typescript
// src/app/shared/services/theme.service.ts
import { Injectable, signal, effect, computed } from '@angular/core';

export type Theme = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>(
    (localStorage.getItem('theme') as Theme | null) ?? 'system'
  );

  readonly theme = this._theme.asReadonly();

  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const t = this._theme();
    if (t !== 'system') return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  constructor() {
    effect(() => {
      const resolved = this.resolvedTheme();
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      localStorage.setItem('theme', this._theme());

      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', resolved === 'dark' ? '#09090b' : '#ffffff');
      }
    });
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }

  toggle(): void {
    this._theme.set(this.resolvedTheme() === 'dark' ? 'light' : 'dark');
  }
}
```

```typescript
// src/app/shared/components/theme-toggle/theme-toggle.ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      (click)="themeService.toggle()"
      aria-label="Toggle theme"
      class="inline-flex size-10 items-center justify-center rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]"
      type="button">
      @if (themeService.resolvedTheme() === 'dark') {
        <!-- Sun icon -->
        <svg aria-hidden="true" class="size-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m12.728 0-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      } @else {
        <!-- Moon icon -->
        <svg aria-hidden="true" class="size-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75 9.75 9.75 0 0 1 8.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 12c0 5.385 4.365 9.75 9.75 9.75 4.692 0 8.641-3.31 9.502-7.998Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      }
    </button>
  `,
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);
}
```

## Advanced v4 Patterns

### Custom Utilities with `@utility`

Define reusable custom utilities:

```scss
/* Custom utility for decorative lines */
@utility line-t {
  @apply relative before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-[var(--color-border)];
}

/* Custom utility for text gradients */
@utility text-gradient {
  @apply bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent;
}
```

### Theme Modifiers

```scss
/* Use @theme inline when referencing other CSS variables */
@theme inline {
  --font-sans: var(--font-inter), system-ui;
}

/* Use @theme static to always generate CSS variables (even when unused) */
@theme static {
  --color-brand: oklch(65% 0.15 240);
}

/* Import with theme options */
@import 'tailwindcss' theme(static);
```

### Namespace Overrides

```scss
@theme {
  /* Clear all default colors and define your own */
  --color-*: initial;
  --color-primary: oklch(55% 0.2 250);
  --color-surface: oklch(100% 0 0);
  --color-border: oklch(88% 0 0);
}
```

### Semi-transparent Color Variants

```scss
@theme {
  /* Use color-mix() for alpha variants */
  --color-primary-10: color-mix(in oklab, var(--color-primary) 10%, transparent);
  --color-primary-20: color-mix(in oklab, var(--color-primary) 20%, transparent);
  --color-primary-50: color-mix(in oklab, var(--color-primary) 50%, transparent);
}
```

### Container Queries

```scss
@theme {
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
}
```

## v3 to v4 Migration Checklist

- [ ] Replace `tailwind.config.ts` with CSS `@theme` block
- [ ] Change `@tailwind base/components/utilities` to `@use 'tailwindcss'` (SCSS) or `@import 'tailwindcss'` (CSS)
- [ ] Define design tokens (colours, radii) in `:root {}` as CSS custom properties — reference with `var(--color-*)`
- [ ] Remove `darkMode: "class"` — use `@media (prefers-color-scheme: dark)` or `@custom-variant dark` for class-based toggling
- [ ] Move `@keyframes` inside `@theme` blocks (ensures keyframes output with theme)
- [ ] Replace Tailwind plugins with `@utility` directives
- [ ] Update `h-10 w-10` to `size-10` (new shorthand utility)
- [ ] Delete any `tailwind.config.js` / `tailwind.config.ts` files
- [ ] Consider OKLCH colors for better perceptual uniformity
- [ ] Remove `postcss.config.js` — use `.postcssrc.json` with `@tailwindcss/postcss`