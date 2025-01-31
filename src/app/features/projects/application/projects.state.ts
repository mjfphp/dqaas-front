import { Project } from "../domain/types/project.type";

export interface ProjectsState {
    projectsList: Project[];
    editedProjectId: string | undefined;
    deletedProjectId: string | undefined;
    project: Project | undefined;
    isLoadingProjects: boolean;
    isLoadingProject: boolean;
    isDeletingProject: boolean;
};

export const initialState: ProjectsState = {
    projectsList: [],
    editedProjectId: undefined,
    deletedProjectId: undefined,
    project: undefined,
    isLoadingProjects: false,
    isLoadingProject: false,
    isDeletingProject: false,
};
