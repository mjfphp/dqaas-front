import { createFeature, createReducer, on } from "@ngrx/store";
import { initialState } from "./sort.state";
import { sortActions } from "./sort.actions";
import { updatePageSortConfig } from "./reducers/update-page-sort-config";

const sortFeature = createFeature({
    name: "sort",
    reducer: createReducer(
        initialState,
        on(sortActions.updatePageSortConfig, updatePageSortConfig),
    )
});

export const {
    name,
    reducer,
    selectSortConfigs,
} = sortFeature;
