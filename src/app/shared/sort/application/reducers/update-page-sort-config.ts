import { PageSort } from "../../domain/types/page-sort.type";
import { SortState } from "../sort.state";

export function updatePageSortConfig (
    state: SortState,
    { pageSort }: { pageSort: PageSort },
): SortState {
    return {
        ...state,
        sortConfigs: {
            ...state.sortConfigs,
            [pageSort.pageName]: pageSort.sortConfig,
        },
    };
}
