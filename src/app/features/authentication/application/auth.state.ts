export interface AuthState {
    isLoggedIn: boolean;
    isLoginRequestHandled: boolean;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    isLoginRequestHandled: false,
};