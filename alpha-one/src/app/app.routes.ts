import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home/home').then((m) => m.Home),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'controls',
    loadComponent: () =>
      import('./features/controls/controls/controls').then((m) => m.Controls),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

