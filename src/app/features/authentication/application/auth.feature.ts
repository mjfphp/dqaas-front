import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import { authActions } from './auth.actions';

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(authActions.loginSuccess, (state: AuthState) => ({
            ...state,
            isLoggedIn: true,
            isLoginRequestHandled: true,
        })),
        on(authActions.loginError, (state: AuthState) => ({
            ...state,
            isLoggedIn: false,
            isLoginRequestHandled: true,
        }))
    ),
});

export const {
    name,
    reducer,
    selectAuthState,
    selectIsLoggedIn,
    selectIsLoginRequestHandled
} = authFeature;
