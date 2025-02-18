import { JwtToken } from "../../../core/domain/types/jwt-token.type";
import { User } from "../domain/types/user.type";

export type UserState = {
	token: JwtToken | undefined;
	user: User | undefined;
};

export const initialState: UserState = {
	token: undefined,
	user: undefined,
};