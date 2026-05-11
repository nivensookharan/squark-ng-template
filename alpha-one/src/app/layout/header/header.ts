import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';
import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly themeService = inject(ThemeService);
}
