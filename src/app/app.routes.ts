import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/errors/presentation/pages/not-found-page/not-found-page.component';
import { InternalServerErrorPageComponent } from './core/errors/presentation/pages/internal-server-error-page/internal-server-error-page.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./core/features.routes').then(m => m.FEATURES_ROUTES) },
  { path: '404', component: NotFoundPageComponent },
  { path: '500', component: InternalServerErrorPageComponent },
  { path: '**', redirectTo: '404' },
];
