import { DecodedToken } from "../../../authentication/domain/types/decoded-token.type";
import { User } from "../types/user.type";

export function userFactory(account: DecodedToken): User {
	return {
		id: account.id,
		sub: account.sub,
		name: account.name,
        email:account.email,
        role: account.role,
	};
}