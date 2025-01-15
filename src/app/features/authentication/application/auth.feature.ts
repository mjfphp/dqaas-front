import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import { authActions } from './auth.actions';

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(authActions.login, (state: AuthState) => ({
            ...state,
            isLoading: true
        })),
        on(authActions.accessTokenReceived, (state: AuthState) => ({
            ...state,
            isLoginRequestHandled: true,
            isAccessTokenReceived: true,
        })),
        on(authActions.startLoading, (state: AuthState) => ({
            ...state,
            isLoading: true,
        })),
        on(authActions.stopLoading, (state: AuthState) => ({
            ...state,
            isLoading: false,
        })),
        on(authActions.loginSuccess, (state: AuthState) => ({
            ...state,
            isLoginRequestHandled: true,
            isLoggedIn: true,
        })),
        on(authActions.loginError, (state: AuthState) => ({
            ...state,
            isLoginRequestHandled: true,
            isLoggedIn: false,
        }))
    ),
});

export const {
    name,
    reducer,
    selectAuthState,
    selectIsLoginRequestHandled,
    selectIsAccessTokenReceived,
    selectIsLoggedIn,
    selectIsLoading
} = authFeature;
