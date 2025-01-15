import { ActionReducerMap } from "@ngrx/store";
import { AuthState } from "../../../../features/authentication/application/auth.state";
import * as authFeature from "../../../../features/authentication/application/auth.feature";
import * as modalFeature from "../../../../shared/modal/application/modal.feature";
import { ModalState } from "../../../../shared/modal/application/modal.state";

export type State = {
	[authFeature.name]: AuthState;
	[modalFeature.name]: ModalState;
};

export const reducers: ActionReducerMap<State> = {
	[authFeature.name]: authFeature.reducer,
	[modalFeature.name]: modalFeature.reducer
};
