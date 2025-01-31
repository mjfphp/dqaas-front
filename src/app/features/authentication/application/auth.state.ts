export interface AuthState {
    isLoginRequestHandled: boolean;
    isAccessTokenReceived: boolean;
    isLoggedIn: boolean;
    isLoading: boolean;
};

export const initialState: AuthState = {
    isLoginRequestHandled: false,
    isAccessTokenReceived: false,
    isLoggedIn: false,
    isLoading: false,
};
