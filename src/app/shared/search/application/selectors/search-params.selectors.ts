import { createSelector } from "@ngrx/store";
import { PageName } from "../../../sort/domain/enums/page-name.enum";
import { selectSearchParams } from "../search.feature";

// Selector to get sortConfig for a specific page
export const selectPageSearchParams = (pageName: PageName) =>
	createSelector(selectSearchParams, (searchParams) => searchParams[pageName]);