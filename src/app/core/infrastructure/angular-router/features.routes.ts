import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../presentation/main-layout/main-layout.component';

export const FEATURES_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../../features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
        data: {
          breadcrumb: 'Tableau de bord'
        }
      },
      {
        path: 'projects',
        loadChildren: () => import('../../../features/projects/projects.routes').then(m => m.PROJECTS_ROUTES),
        data: {
          breadcrumb: 'Gestion des projets'
        }
      },
    ]
  }
];
