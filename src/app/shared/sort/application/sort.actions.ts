import { createActionGroup, props } from "@ngrx/store";
import { PageSort } from "../domain/types/page-sort.type";

export const sortActions = createActionGroup({
	source: 'Sort',
	events: {
		updatePageSortConfig: props<{ pageSort: PageSort }>(),
	},
});
