import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { AuthProvider } from "../../../core/infrastructure/auth/enums/auth-provider.enum";
import { FirstConnection } from "../../../core/domain/types/first-connection.type";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        login: props<{ authProvider: AuthProvider }>(),
        accessTokenReceived: emptyProps(),
        generateJwt: props<{ firstConnection: FirstConnection }>(),
        logout: emptyProps(),
        loginSuccess: emptyProps(),
        loginError: emptyProps(),
        startLoading: emptyProps(),
        stopLoading: emptyProps()
    }
});
