import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _isDark = signal<boolean>(this._loadPreference());

  readonly isDark = this._isDark.asReadonly();

  public toggle(): void {
    const next = !this._isDark();
    this._isDark.set(next);
    this._applyTheme(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  private _loadPreference(): boolean {
    const stored = localStorage.getItem('theme');
    if (stored) {
      const isDark = stored === 'dark';
      this._applyTheme(isDark);
      return isDark;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this._applyTheme(prefersDark);
    return prefersDark;
  }

  private _applyTheme(isDark: boolean): void {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}

