import { createSelector } from "@ngrx/store";
import { selectData, selectIsLoading, selectIsOpened } from "../modal.feature";
import { Modal } from "../../domain/enums/modal.enum";

// Selector to check the openning state of a specific modal
export const selectModalOpened = (id: Modal) =>
	createSelector(selectIsOpened, (isOpened) => isOpened[id] ?? false);

// Selector to get data for a specific modal
export const selectModalData = (id: Modal) =>
	createSelector(selectData, (data) => data[id]);

// Selector to check the loading state of a specific modal
export const selectModalLoading = (id: Modal) =>
	createSelector(selectIsLoading, (isLoading) => isLoading[id] ?? false);
