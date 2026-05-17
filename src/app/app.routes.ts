import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shell/shell.component').then(c => c.ShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'emprendimientos',
        loadComponent: () => import('./pages/emprendimientos/emprendimientos.component').then(c => c.EmprendimientosComponent),
      },
      {
        path: 'promociones',
        loadComponent: () => import('./pages/promociones/promociones.component').then(c => c.PromocionesComponent),
      },
      {
        path: 'info',
        loadComponent: () => import('./pages/info/info.component').then(c => c.InfoComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
