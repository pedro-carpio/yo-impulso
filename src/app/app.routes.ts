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
      {
        path: 'fundacion',
        redirectTo: 'fundacion/impacto',
        pathMatch: 'full',
      },
      {
        path: 'fundacion/impacto',
        loadComponent: () => import('./pages/fundacion/impacto/fundacion-impacto.component').then(c => c.FundacionImpactoComponent),
      },
      {
        path: 'fundacion/eventos',
        loadComponent: () => import('./pages/fundacion/eventos/fundacion-eventos.component').then(c => c.FundacionEventosComponent),
      },
      {
        path: 'fundacion/registro',
        loadComponent: () => import('./pages/fundacion/registro/fundacion-registro.component').then(c => c.FundacionRegistroComponent),
      },
      {
        path: 'emprendedor',
        redirectTo: 'emprendedor/postulacion',
        pathMatch: 'full',
      },
      {
        path: 'emprendedor/postulacion',
        loadComponent: () => import('./pages/emprendedor/postulacion/emprendedor-postulacion.component').then(c => c.EmprendedorPostulacionComponent),
      },
      {
        path: 'emprendedor/finanzas',
        loadComponent: () => import('./pages/emprendedor/finanzas/emprendedor-finanzas.component').then(c => c.EmprendedorFinanzasComponent),
      },
      {
        path: 'emprendedor/noticias',
        loadComponent: () => import('./pages/emprendedor/noticias/emprendedor-noticias.component').then(c => c.EmprendedorNoticiasComponent),
      },
      {
        path: 'emprendedor/catalogo',
        loadComponent: () => import('./pages/emprendedor/catalogo/emprendedor-catalogo.component').then(c => c.EmprendedorCatalogoComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
