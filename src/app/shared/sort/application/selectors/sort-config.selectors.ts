import { createSelector } from "@ngrx/store";
import { selectSortConfigs } from "../sort.feature";
import { PageName } from "../../domain/enums/page-name.enum";

// Selector to get sortConfig for a specific page
export const selectPageSortConfig = (pageName: PageName) =>
	createSelector(selectSortConfigs, (sortConfigs) => sortConfigs[pageName]);