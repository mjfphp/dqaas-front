import { createSelector } from "@ngrx/store";
import { selectData, selectIsLoading, selectIsOpened } from "../modal.feature";
import { ModalType } from "../../domain/enums/modal-type.enum";

// Selector to check the openning state of a specific modal
export const selectModalOpened = (id: ModalType) =>
	createSelector(selectIsOpened, (isOpened) => isOpened[id] ?? false);

// Selector to get data for a specific modal
export const selectModalData = (id: ModalType) =>
	createSelector(selectData, (data) => data[id]);

// Selector to check the loading state of a specific modal
export const selectModalLoading = (id: ModalType) =>
	createSelector(selectIsLoading, (isLoading) => isLoading[id] ?? false);
