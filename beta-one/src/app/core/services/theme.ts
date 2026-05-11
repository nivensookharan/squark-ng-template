import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);
  private readonly _theme = signal<Theme>(this._getInitialTheme());

  readonly isDark = computed((): boolean => this._theme() === 'dark');

  private readonly _applyThemeEffect = effect((): void => {
    const theme = this._theme();

    if (!this._isBrowser) {
      return;
    }

    this._document.documentElement.classList.toggle('dark', theme === 'dark');
    this._document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  });

  public toggle(): void {
    this._theme.update((theme): Theme => (theme === 'dark' ? 'light' : 'dark'));
  }

  private _getInitialTheme(): Theme {
    if (!this._isBrowser) {
      return 'light';
    }

    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }
}
