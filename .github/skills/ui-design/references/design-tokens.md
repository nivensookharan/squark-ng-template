# Design Tokens — Default Palette

This file is the **single source of truth** for the design tokens used across every Angular application in this workspace. When scaffolding a new app, copy the contents of the [Reference `styles.scss`](#reference-stylesscss) section verbatim into the project's `src/styles.scss` (or augment an existing file). All component styling — Tailwind utilities, scoped SCSS, inline `[style]` bindings — must reference these tokens via `var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`, etc., and never hard-code colour, radius, or shadow values.

> **Why OKLCH?** OKLCH is perceptually uniform, so two colours with the same lightness value look equally bright to the human eye. This makes generating dark-mode variants and accessible contrast pairs predictable. See [oklch.com](https://oklch.com) for a picker.

## Token Categories

| Category    | Prefix            | Examples                                       |
| ----------- | ----------------- | ---------------------------------------------- |
| Colour      | `--color-*`       | `--color-primary`, `--color-destructive`       |
| Radius      | `--radius-*`      | `--radius-sm`, `--radius-base`, `--radius-lg`  |
| Shadow      | `--shadow-*`      | `--shadow-sm`, `--shadow-md`                   |
| Spacing     | `--space-*`       | `--space-1`, `--space-4`                       |
| Typography  | `--font-*`        | `--font-sans`, `--font-mono`                   |
| Z-index     | `--z-*`           | `--z-dropdown`, `--z-modal`, `--z-toast`       |

## Colour Palette

Every colour token follows a **semantic naming** convention rather than a colour-name convention. This keeps templates portable across themes — swapping `--color-primary` from blue to violet does not require touching any component code.

### Surfaces & Text

| Token                      | Light Mode (OKLCH)        | Dark Mode (OKLCH)         | Usage                                       |
| -------------------------- | ------------------------- | ------------------------- | ------------------------------------------- |
| `--color-background`       | `oklch(100% 0 0)`         | `oklch(14.5% 0.025 264)`  | Top-level page background                   |
| `--color-foreground`       | `oklch(14.5% 0.025 264)`  | `oklch(98% 0.01 264)`     | Default text on `--color-background`        |
| `--color-surface`          | `oklch(100% 0 0)`         | `oklch(12% 0 0)`          | Cards, popovers, dialogs                    |
| `--color-surface-alt`      | `oklch(96% 0 0)`          | `oklch(18% 0 0)`          | Hover states, muted panels                  |
| `--color-text`             | `oklch(15% 0 0)`          | `oklch(95% 0 0)`          | Body copy on a surface                      |
| `--color-text-muted`       | `oklch(45% 0 0)`          | `oklch(60% 0 0)`          | Secondary copy, captions, placeholders      |
| `--color-border`           | `oklch(88% 0 0)`          | `oklch(28% 0 0)`          | Hairlines, input borders, dividers          |

### Brand & Intent

| Token                              | Light Mode (OKLCH)        | Dark Mode (OKLCH)         | Usage                                       |
| ---------------------------------- | ------------------------- | ------------------------- | ------------------------------------------- |
| `--color-primary`                  | `oklch(55% 0.2 250)`      | `oklch(65% 0.2 250)`      | Primary CTAs, focus rings, active links     |
| `--color-primary-foreground`       | `oklch(98% 0 0)`          | `oklch(10% 0 0)`          | Text/icons on `--color-primary`             |
| `--color-secondary`                | `oklch(96% 0.01 264)`     | `oklch(22% 0.02 264)`     | Secondary buttons, subtle accents           |
| `--color-secondary-foreground`     | `oklch(14.5% 0.025 264)`  | `oklch(98% 0.01 264)`     | Text/icons on `--color-secondary`           |
| `--color-accent`                   | `oklch(96% 0.01 264)`     | `oklch(22% 0.02 264)`     | Hover backgrounds, subtle highlights        |
| `--color-accent-foreground`        | `oklch(14.5% 0.025 264)`  | `oklch(98% 0.01 264)`     | Text/icons on `--color-accent`              |
| `--color-muted`                    | `oklch(96% 0.01 264)`     | `oklch(22% 0.02 264)`     | Disabled inputs, muted backgrounds          |
| `--color-muted-foreground`         | `oklch(46% 0.02 264)`     | `oklch(65% 0.02 264)`     | Text on `--color-muted`                     |

### Status

| Token                              | Light Mode (OKLCH)        | Dark Mode (OKLCH)         | Usage                                       |
| ---------------------------------- | ------------------------- | ------------------------- | ------------------------------------------- |
| `--color-destructive`              | `oklch(53% 0.22 27)`      | `oklch(42% 0.15 27)`      | Errors, destructive actions                 |
| `--color-destructive-foreground`   | `oklch(98% 0.01 264)`     | `oklch(98% 0.01 264)`     | Text/icons on `--color-destructive`         |
| `--color-success`                  | `oklch(62% 0.18 145)`     | `oklch(70% 0.18 145)`     | Confirmations, success messages             |
| `--color-success-foreground`       | `oklch(98% 0 0)`          | `oklch(10% 0 0)`          | Text/icons on `--color-success`             |
| `--color-warning`                  | `oklch(75% 0.16 80)`      | `oklch(78% 0.16 80)`      | Warnings, pending states                    |
| `--color-warning-foreground`       | `oklch(20% 0.05 80)`      | `oklch(15% 0.05 80)`      | Text/icons on `--color-warning`             |
| `--color-info`                     | `oklch(60% 0.15 230)`     | `oklch(70% 0.15 230)`     | Informational banners, tips                 |
| `--color-info-foreground`          | `oklch(98% 0 0)`          | `oklch(10% 0 0)`          | Text/icons on `--color-info`                |

## Radius

| Token            | Value      | Usage                                  |
| ---------------- | ---------- | -------------------------------------- |
| `--radius-sm`    | `0.25rem`  | Tags, badges, small inputs             |
| `--radius-base`  | `0.5rem`   | Buttons, inputs, cards (default)       |
| `--radius-lg`    | `0.75rem`  | Dialogs, large cards, prominent panels |
| `--radius-xl`    | `1rem`     | Hero panels, marketing surfaces        |
| `--radius-full`  | `9999px`   | Pills, avatars, circular icons         |

## Shadow

Shadows are tuned for both light and dark modes (lower opacity in dark mode to avoid muddy halos).

| Token           | Light Value                                                       | Usage                                  |
| --------------- | ----------------------------------------------------------------- | -------------------------------------- |
| `--shadow-sm`   | `0 1px 2px 0 oklch(0% 0 0 / 0.05)`                                | Subtle elevation (cards at rest)       |
| `--shadow-md`   | `0 4px 6px -1px oklch(0% 0 0 / 0.1), 0 2px 4px -2px oklch(0% 0 0 / 0.1)` | Hover elevation, popovers       |
| `--shadow-lg`   | `0 10px 15px -3px oklch(0% 0 0 / 0.1), 0 4px 6px -4px oklch(0% 0 0 / 0.1)` | Dialogs, dropdowns               |
| `--shadow-xl`   | `0 20px 25px -5px oklch(0% 0 0 / 0.1), 0 8px 10px -6px oklch(0% 0 0 / 0.1)` | Toast, command palette          |

## Spacing

A 4px base scale aligned with Tailwind's default spacing.

| Token         | Value      |
| ------------- | ---------- |
| `--space-1`   | `0.25rem`  |
| `--space-2`   | `0.5rem`   |
| `--space-3`   | `0.75rem`  |
| `--space-4`   | `1rem`     |
| `--space-6`   | `1.5rem`   |
| `--space-8`   | `2rem`     |
| `--space-12`  | `3rem`     |
| `--space-16`  | `4rem`     |

## Typography

| Token                | Value                                                         |
| -------------------- | ------------------------------------------------------------- |
| `--font-sans`        | `'Inter', system-ui, -apple-system, sans-serif`               |
| `--font-mono`        | `'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace` |
| `--font-size-xs`     | `0.75rem`                                                     |
| `--font-size-sm`     | `0.875rem`                                                    |
| `--font-size-base`   | `1rem`                                                        |
| `--font-size-lg`     | `1.125rem`                                                    |
| `--font-size-xl`     | `1.25rem`                                                     |
| `--font-size-2xl`    | `1.5rem`                                                      |
| `--font-size-3xl`    | `1.875rem`                                                    |
| `--font-size-4xl`    | `2.25rem`                                                     |

## Z-index

| Token             | Value  | Usage                       |
| ----------------- | ------ | --------------------------- |
| `--z-base`        | `0`    | Default content             |
| `--z-dropdown`    | `1000` | Select menus, tooltips      |
| `--z-sticky`      | `1100` | Sticky headers              |
| `--z-overlay`     | `1200` | Modal/dialog backdrops      |
| `--z-modal`       | `1300` | Modals, dialogs             |
| `--z-popover`     | `1400` | Popovers, command palettes  |
| `--z-toast`       | `1500` | Toasts, notifications       |

## Reference `styles.scss`

Drop this into `src/styles.scss` for any new app. It declares every token above and wires up Tailwind v4.

```scss
/* src/styles.scss — global tokens + Tailwind v4 */
@use 'tailwindcss';

/* ---------- Light mode (default) ---------- */
:root {
  /* Surfaces & text */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);
  --color-surface: oklch(100% 0 0);
  --color-surface-alt: oklch(96% 0 0);
  --color-text: oklch(15% 0 0);
  --color-text-muted: oklch(45% 0 0);
  --color-border: oklch(88% 0 0);

  /* Brand & intent */
  --color-primary: oklch(55% 0.2 250);
  --color-primary-foreground: oklch(98% 0 0);
  --color-secondary: oklch(96% 0.01 264);
  --color-secondary-foreground: oklch(14.5% 0.025 264);
  --color-accent: oklch(96% 0.01 264);
  --color-accent-foreground: oklch(14.5% 0.025 264);
  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(46% 0.02 264);

  /* Status */
  --color-destructive: oklch(53% 0.22 27);
  --color-destructive-foreground: oklch(98% 0.01 264);
  --color-success: oklch(62% 0.18 145);
  --color-success-foreground: oklch(98% 0 0);
  --color-warning: oklch(75% 0.16 80);
  --color-warning-foreground: oklch(20% 0.05 80);
  --color-info: oklch(60% 0.15 230);
  --color-info-foreground: oklch(98% 0 0);

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-base: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 1px 2px 0 oklch(0% 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px oklch(0% 0 0 / 0.1), 0 2px 4px -2px oklch(0% 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px oklch(0% 0 0 / 0.1), 0 4px 6px -4px oklch(0% 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px oklch(0% 0 0 / 0.1), 0 8px 10px -6px oklch(0% 0 0 / 0.1);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Z-index */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-overlay: 1200;
  --z-modal: 1300;
  --z-popover: 1400;
  --z-toast: 1500;
}

/* ---------- Dark mode (system preference, suppressible) ---------- */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-background: oklch(14.5% 0.025 264);
    --color-foreground: oklch(98% 0.01 264);
    --color-surface: oklch(12% 0 0);
    --color-surface-alt: oklch(18% 0 0);
    --color-text: oklch(95% 0 0);
    --color-text-muted: oklch(60% 0 0);
    --color-border: oklch(28% 0 0);

    --color-primary: oklch(65% 0.2 250);
    --color-primary-foreground: oklch(10% 0 0);
    --color-secondary: oklch(22% 0.02 264);
    --color-secondary-foreground: oklch(98% 0.01 264);
    --color-accent: oklch(22% 0.02 264);
    --color-accent-foreground: oklch(98% 0.01 264);
    --color-muted: oklch(22% 0.02 264);
    --color-muted-foreground: oklch(65% 0.02 264);

    --color-destructive: oklch(42% 0.15 27);
    --color-destructive-foreground: oklch(98% 0.01 264);
    --color-success: oklch(70% 0.18 145);
    --color-success-foreground: oklch(10% 0 0);
    --color-warning: oklch(78% 0.16 80);
    --color-warning-foreground: oklch(15% 0.05 80);
    --color-info: oklch(70% 0.15 230);
    --color-info-foreground: oklch(10% 0 0);

    --shadow-sm: 0 1px 2px 0 oklch(0% 0 0 / 0.3);
    --shadow-md: 0 4px 6px -1px oklch(0% 0 0 / 0.4), 0 2px 4px -2px oklch(0% 0 0 / 0.4);
    --shadow-lg: 0 10px 15px -3px oklch(0% 0 0 / 0.5), 0 4px 6px -4px oklch(0% 0 0 / 0.5);
    --shadow-xl: 0 20px 25px -5px oklch(0% 0 0 / 0.6), 0 8px 10px -6px oklch(0% 0 0 / 0.6);
  }
}

/* ---------- Dark mode (explicit user override via ThemeService) ---------- */
:root[data-theme='dark'] {
  --color-background: oklch(14.5% 0.025 264);
  --color-foreground: oklch(98% 0.01 264);
  --color-surface: oklch(12% 0 0);
  --color-surface-alt: oklch(18% 0 0);
  --color-text: oklch(95% 0 0);
  --color-text-muted: oklch(60% 0 0);
  --color-border: oklch(28% 0 0);

  --color-primary: oklch(65% 0.2 250);
  --color-primary-foreground: oklch(10% 0 0);
  --color-secondary: oklch(22% 0.02 264);
  --color-secondary-foreground: oklch(98% 0.01 264);
  --color-accent: oklch(22% 0.02 264);
  --color-accent-foreground: oklch(98% 0.01 264);
  --color-muted: oklch(22% 0.02 264);
  --color-muted-foreground: oklch(65% 0.02 264);

  --color-destructive: oklch(42% 0.15 27);
  --color-destructive-foreground: oklch(98% 0.01 264);
  --color-success: oklch(70% 0.18 145);
  --color-success-foreground: oklch(10% 0 0);
  --color-warning: oklch(78% 0.16 80);
  --color-warning-foreground: oklch(15% 0.05 80);
  --color-info: oklch(70% 0.15 230);
  --color-info-foreground: oklch(10% 0 0);

  --shadow-sm: 0 1px 2px 0 oklch(0% 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px oklch(0% 0 0 / 0.4), 0 2px 4px -2px oklch(0% 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px oklch(0% 0 0 / 0.5), 0 4px 6px -4px oklch(0% 0 0 / 0.5);
  --shadow-xl: 0 20px 25px -5px oklch(0% 0 0 / 0.6), 0 8px 10px -6px oklch(0% 0 0 / 0.6);
}

/* ---------- Base element styles ---------- */
html,
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}
```

## Usage Rules

1. **Never hard-code colours, radii, or shadows.** Always reference a token: `background-color: var(--color-surface);`, `border-radius: var(--radius-base);`.
2. **Use semantic tokens, not raw colour names.** Prefer `--color-destructive` over `--color-red-500`. Components should not need to know that "destructive" is currently red.
3. **Tailwind v4 arbitrary properties** map cleanly to tokens: `class="bg-[var(--color-surface)] text-[var(--color-text)] rounded-[var(--radius-base)]"`.
4. **Component SCSS** must start with `:host { display: block; }` and reference tokens for any colour/radius/shadow declarations.
5. **Dark mode uses three layers of specificity** — do **not** add per-component dark-mode rules:
   - `:root` — light defaults (always)
   - `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) }` — system dark, suppressible by user
   - `:root[data-theme='dark']` — explicit `ThemeService` override, wins regardless of system preference
6. **Foreground pairs**: every coloured background token has a matching `*-foreground` token guaranteeing AA contrast. Always use them together (e.g., `bg-[var(--color-primary)] text-[var(--color-primary-foreground)]`).

## Extending the Palette

To add a brand-specific token (e.g., a per-app accent), add a new entry to the `:root` block, the `@media (prefers-color-scheme: dark) :root:not([data-theme='light'])` block, **and** the `:root[data-theme='dark']` block in `src/styles.scss`. Document any per-app extensions inline in that app's `styles.scss` so the canonical palette stays unmodified.

```scss
/* alpha/src/styles.scss — extension example */
:root {
  --color-alpha-brand: oklch(60% 0.18 320);
  --color-alpha-brand-foreground: oklch(98% 0 0);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-alpha-brand: oklch(70% 0.18 320);
    --color-alpha-brand-foreground: oklch(10% 0 0);
  }
}

:root[data-theme='dark'] {
  --color-alpha-brand: oklch(70% 0.18 320);
  --color-alpha-brand-foreground: oklch(10% 0 0);
}
```
