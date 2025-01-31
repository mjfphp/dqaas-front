import { ActionReducerMap } from "@ngrx/store";
import * as modalFeature from "../../../../shared/modal/application/modal.feature";
import { ModalState } from "../../../../shared/modal/application/modal.state";
import * as sortFeature from "../../../../shared/sort/application/sort.feature";
import { SortState } from "../../../../shared/sort/application/sort.state";
import * as searchFeature from "../../../../shared/search/application/search.feature";
import { SearchState } from "../../../../shared/search/application/search.state";
import * as authFeature from "../../../../features/authentication/application/auth.feature";
import { AuthState } from "../../../../features/authentication/application/auth.state";
import * as projectsFeature from "../../../../features/projects/application/projects.feature";
import { ProjectsState } from "../../../../features/projects/application/projects.state";

export type State = {
	[modalFeature.name]: ModalState;
	[sortFeature.name]: SortState;
	[searchFeature.name]: SearchState;
	[authFeature.name]: AuthState;
	[projectsFeature.name]: ProjectsState;
};

export const reducers: ActionReducerMap<State> = {
	[modalFeature.name]: modalFeature.reducer,
	[sortFeature.name]: sortFeature.reducer,
	[searchFeature.name]: searchFeature.reducer,
	[authFeature.name]: authFeature.reducer,
	[projectsFeature.name]: projectsFeature.reducer,
};
