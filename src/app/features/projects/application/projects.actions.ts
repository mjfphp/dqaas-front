import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { Project } from "../domain/types/project.type";
import { SearchParams } from "../../../shared/search/domain/types/search-params.type";

export const projectsActions = createActionGroup({
    source: 'Projects',
    events: {
        // Create
        createProject: props<{ project: Project }>(),
        createProjectSuccess: props<{ project: Project }>(),

        // Read All
        loadProjects: props<{ searchParams: SearchParams }>(),
        loadProjectsSuccess: props<{ projects: Project[] }>(),
        loadProjectsFailure: emptyProps(),

        // Read One
        loadProject: props<{ id: string }>(),
        loadProjectSuccess: props<{ project: Project }>(),
        loadProjectFailure: emptyProps(),

        // Update
        updateProject: props<{ project: Project }>(),
        updateProjectSuccess: props<{ project: Project }>(),

        // Delete
        deleteProject: props<{ id: string }>(),
        deleteProjectSuccess: props<{ id: string }>(),
        deleteProjectFailure: emptyProps(),
    }
});
