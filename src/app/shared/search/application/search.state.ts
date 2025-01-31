import { PageName } from "../../sort/domain/enums/page-name.enum";
import { SearchParams } from "../domain/types/search-params.type";

export type SearchState = {
	searchParams: Record<PageName, SearchParams | undefined>;
};

export const initialState: SearchState = {
	searchParams: {
		[PageName.projectsPage]: undefined,
	},
};
