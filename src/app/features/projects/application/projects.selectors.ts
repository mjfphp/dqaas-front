import { createSelector } from "@ngrx/store";
import { selectProject } from "./projects.feature";

export const selecOwnerId = createSelector(
	selectProject,
	project => project?.id,
);