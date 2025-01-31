import { createFeature, createReducer, on } from "@ngrx/store";
import { initialState } from "./search.state";
import { searchActions } from "./search.actions";
import { updatePageSearchParams } from "./reducers/update-page-search-params";

const searchFeature = createFeature({
    name: "search",
    reducer: createReducer(
        initialState,
        on(searchActions.updatePageSearchParams, updatePageSearchParams),
    )
});

export const {
    name,
    reducer,
    selectSearchState,
    selectSearchParams,
} = searchFeature;
