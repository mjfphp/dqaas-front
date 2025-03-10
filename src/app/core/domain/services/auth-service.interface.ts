import { AuthProvider } from "../../infrastructure/auth/enums/auth-provider.enum";

export abstract class AuthServiceInterface {
	abstract login(authProvider: AuthProvider): void;
	abstract hasValidAccessToken(): boolean;
	abstract getAccessToken(): string;
	abstract logout(): void;
}