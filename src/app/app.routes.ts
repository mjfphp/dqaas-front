import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/presentation/pages/not-found-page/not-found-page.component';
import { InternalServerErrorPageComponent } from './core/presentation/pages/internal-server-error-page/internal-server-error-page.component';
import { JwtTokenGuard } from './core/infrastructure/angular-router/guards/jwt-token.guard';
import { LoginGuard } from './core/infrastructure/angular-router/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [JwtTokenGuard],
    loadChildren: () => import('./core/infrastructure/angular-router/features.routes').then(m => m.FEATURES_ROUTES),
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./features/authentication/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  { 
    path: '500',
    component: InternalServerErrorPageComponent,
  },
  { 
    path: '**',
    redirectTo: '404',
  },
];
