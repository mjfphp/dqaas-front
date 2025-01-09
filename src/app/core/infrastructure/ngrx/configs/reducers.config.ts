import { ActionReducerMap } from "@ngrx/store";
import { AuthState } from "../../../../features/authentication/application/auth.state";
import * as authFeature from "../../../../features/authentication/application/auth.feature";

export type State = {
	[authFeature.name]: AuthState;
};

export const reducers: ActionReducerMap<State> = {
	[authFeature.name]: authFeature.reducer
};
