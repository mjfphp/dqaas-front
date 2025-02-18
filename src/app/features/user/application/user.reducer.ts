import { User } from "../domain/types/user.type";
import { UserState } from "./user.state";

export function initUser(
	state: UserState,
	{user}: {user: User},
): UserState {
	return {...state, user};
}
