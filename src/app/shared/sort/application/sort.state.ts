import { SortOrder } from "../domain/enums/sort-order.enum";
import { PageName } from "../domain/enums/page-name.enum";
import { SortConfig } from "../domain/types/sort-config.type";

export type SortState = {
	sortConfigs: Record<PageName, SortConfig | undefined>;
};

export const initialState: SortState = {
	sortConfigs: {
		[PageName.projectsPage]: {
			field: "name",
			order: SortOrder.descend,
		},
	},
};
