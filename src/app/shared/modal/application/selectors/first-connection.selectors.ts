import { createSelector } from "@ngrx/store";
import { selectData, selectIsLoading } from "../modal.feature";
import { FirstConnection } from "../../../../core/domain/types/first-connection.type";
import { Modal } from "../../domain/enums/modal.enum";

export const selectFirstConnectionData = createSelector(
	selectData,
	(data): FirstConnection | undefined => data[Modal.firstConnection]
);

export const selectFirstConnectionLoading = createSelector(
	selectIsLoading,
	(isLoading): boolean | undefined => isLoading[Modal.firstConnection]
);
