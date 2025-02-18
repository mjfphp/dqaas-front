import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../domain/types/user.type";

export const userActions = createActionGroup({
	source: 'User',
	events: {
		Request: emptyProps(),
		'Request Success': props<{user: User}>(),
		'Request Fail': emptyProps(),
	},
});