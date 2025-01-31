import { Routes } from '@angular/router';
import { ProjectsListPageComponent } from './presentation/pages/projects-list-page/projects-list-page.component';

export const PROJECTS_ROUTES: Routes = [
  { path: '', component: ProjectsListPageComponent },
];
