import { createSelector } from "@ngrx/store";
import { selectUser } from "./user.feature";
import { User } from "../domain/types/user.type";
import { ADMIN } from "../domain/config/role";

export const selectUserRoleAdmin = createSelector(
	selectUser,
	(user: User | null | undefined) => {

	if (!user) {
		return false;
	}

	return user?.role === ADMIN;
}
);

export const selectUserId = createSelector(
	selectUser,
	user => user?.id,
);