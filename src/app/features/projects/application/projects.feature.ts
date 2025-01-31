import { createFeature, createReducer, on } from '@ngrx/store';
import { ProjectsState, initialState } from './projects.state';
import { projectsActions } from './projects.actions';

const projectsFeature = createFeature({
    name: 'projects',
    reducer: createReducer(
        initialState,
        // Load All Projects
        on(projectsActions.loadProjects, (state: ProjectsState) => ({
            ...state,
            isLoadingProjects: true,
        })),
        on(projectsActions.loadProjectsSuccess, (state: ProjectsState, { projects }) => ({
            ...state,
            projectsList: projects,
            isLoadingProjects: false,
        })),
        on(projectsActions.loadProjectsFailure, (state: ProjectsState) => ({
            ...state,
            isLoadingProjects: false,
        })),

        // Load Project
        on(projectsActions.loadProject, (state: ProjectsState, { id }) => ({
            ...state,
            editedProjectId: id,
            isLoadingProject: true,
        })),
        on(projectsActions.loadProjectSuccess, (state: ProjectsState, { project }) => ({
            ...state,
            project: project,
            isLoadingProject: false,
        })),
        on(projectsActions.loadProjectFailure, (state: ProjectsState) => ({
            ...state,
            editedProjectId: undefined,
            isLoadingProject: false,
        })),

        // Delete Project
        on(projectsActions.deleteProject, (state: ProjectsState, { id }) => ({
            ...state,
            deletedProjectId: id,
            isDeletingProject: true,
        })),
        on(projectsActions.deleteProjectSuccess, (state: ProjectsState) => ({
            ...state,
            deletedProjectId: undefined,
            isLoadingProject: false,
        })),
        on(projectsActions.deleteProjectFailure, (state: ProjectsState) => ({
            ...state,
            deletedProjectId: undefined,
            isDeletingProject: false,
        })),

    ),
});

export const {
    name,
    reducer,
    selectProjectsState,
    selectProjectsList,
    selectEditedProjectId,
    selectDeletedProjectId,
    selectProject,
    selectIsLoadingProject,
    selectIsLoadingProjects,
    selectIsDeletingProject,
} = projectsFeature;
