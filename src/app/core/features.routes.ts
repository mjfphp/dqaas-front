import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/presentation/main-layout/main-layout.component';

export const FEATURES_ROUTES: Routes = [
  { 
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', loadChildren: () => import('../features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
    ]
  }
];
