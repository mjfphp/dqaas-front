import { createSelector } from "@ngrx/store";
import { SearchParams } from "../../domain/types/search-params.type";
import { selectSearchParams } from "../search.feature";
import { PageName } from "../../../sort/domain/enums/page-name.enum";

export const selectProjectsPageSearchParams = createSelector(
	selectSearchParams,
	(searchParams): SearchParams | undefined => searchParams[PageName.projectsPage],
);
