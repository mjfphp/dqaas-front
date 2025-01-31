import { createActionGroup, props } from "@ngrx/store";
import { PageSearch } from "../domain/types/page-search.type";

export const searchActions = createActionGroup({
	source: 'Search',
	events: {
		updatePageSearchParams: props<{ pageSearch: PageSearch }>(),
	},
});
