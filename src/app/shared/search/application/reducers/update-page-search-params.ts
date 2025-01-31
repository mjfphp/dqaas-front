import { PageSearch } from "../../domain/types/page-search.type";
import { SearchState } from "../search.state";

export function updatePageSearchParams (
    state: SearchState,
    { pageSearch }: { pageSearch: PageSearch },
): SearchState {
    return {
        ...state,
        searchParams: {
            ...state.searchParams,
            [pageSearch.pageName]: pageSearch.searchParams,
        },
    };
}
