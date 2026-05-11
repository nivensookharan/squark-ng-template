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
    path: 'map',
    loadComponent: () =>
      import('./features/map/map/map').then((m) => m.Map),
  },
  {
    path: 'data',
    loadComponent: () =>
      import('./features/data/data/data').then((m) => m.Data),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
