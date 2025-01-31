import { createSelector } from "@ngrx/store";
import { selectSortConfigs } from "../sort.feature";
import { PageName } from "../../domain/enums/page-name.enum";
import { SortConfig } from "../../domain/types/sort-config.type";

export const selectProjectsPageSortConfig = createSelector(
	selectSortConfigs,
	(sortConfigs): SortConfig | undefined => sortConfigs[PageName.projectsPage],
);
