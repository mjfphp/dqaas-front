import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { projectsActions } from './projects.actions';
import { ProjectService } from '../domain/services/project.service';
import { Store } from '@ngrx/store';
import { selectProjectsPageSearchParams } from '../../../shared/search/application/selectors/project-search-params.selectors';
import { modalActions } from '../../../shared/modal/application/modal.actions';
import { ModalType } from '../../../shared/modal/domain/enums/modal-type.enum';

@Injectable()
export class ProjectsEffects {

    createProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(projectsActions.createProject),
            switchMap(action => {
                return this._projectsService.createProject(action.project).pipe(
                    tap(response => {
                        console.log('Created Project Notification : ', response);
                    }),
                    concatMap(project => [projectsActions.createProjectSuccess({ project })]),
                    catchError(() => of(modalActions.updateState({ id: ModalType.projectForm, data: action.project, isLoading: false }))),
                )
            }
            )
        )
    );

    loadProjectsAfterCreateNewProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(projectsActions.createProjectSuccess),
            withLatestFrom(this._store.select(selectProjectsPageSearchParams)),
            switchMap(([_, searchParams]) => [
                modalActions.close({ id: ModalType.projectForm }),
                projectsActions.loadProjects({ searchParams: searchParams! })  // Pass the searchParams if necessary
            ])
        )
    );

    loadProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(projectsActions.loadProjects),
            switchMap(action => {
                return this._projectsService.getProjects(action.searchParams).pipe(
                    tap(response => {
                        console.log('Projects List : ', response);
                    }),
                    concatMap(projects => [projectsActions.loadProjectsSuccess({ projects })]),
                    catchError(() => of(projectsActions.loadProjectsFailure())),
                )
            }
            )
        )
    );

    loadProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(projectsActions.loadProject),
            switchMap(action => {
                return this._projectsService.getProject(action.id).pipe(
                    tap(response => {
                        console.log('Project : ', response);
                    }),
                    concatMap(project => [projectsActions.loadProjectSuccess({ project })]),
                    catchError(() => of(projectsActions.loadProjectFailure())),
                )
            }
            )
        )
    );

    updateProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(projectsActions.updateProject),
            switchMap(action => {
                return this._projectsService.createProject(action.project).pipe(
                    tap(response => {
                        console.log('Updated Project : ', response);
                    }),
                    concatMap(project => [projectsActions.updateProjectSuccess({ project })]),
                    catchError(() => of(modalActions.updateState({ id: ModalType.projectForm, data: action.project, isLoading: false }))),
                )
            }
            )
        )
    );

    deleteProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(projectsActions.deleteProject),
            switchMap(action => {
                return this._projectsService.deleteProject(action.id).pipe(
                    tap(response => {
                        console.log('Project : ', response);
                    }),
                    concatMap(() => [projectsActions.deleteProjectSuccess({ id: action.id })]),
                    catchError(() => of(projectsActions.loadProjectFailure())),
                )
            }
            )
        )
    );

    constructor(private readonly _store: Store,
        private readonly actions$: Actions,
        private readonly _projectsService: ProjectService) { }

}
