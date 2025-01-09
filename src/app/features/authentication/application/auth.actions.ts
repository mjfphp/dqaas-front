import { createActionGroup, createAction, props, emptyProps } from "@ngrx/store";
import { AuthProvider } from "../../../shared/enums/auth-provider.enum";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        login: props<{ authProvider: AuthProvider }>(),
        logout: emptyProps(),
        loginSuccess: emptyProps(),
        loginError: emptyProps(),
    },
});