import { createSelector } from "@ngrx/store";
import { selectData, selectIsLoading } from "../modal.feature";
import { FirstConnection } from "../../../../core/domain/types/first-connection.type";
import { ModalType} from "../../domain/enums/modal-type.enum";

export const selectFirstConnectionData = createSelector(
	selectData,
	(data): FirstConnection | undefined => data[ModalType.firstConnection]
);

export const selectFirstConnectionLoading = createSelector(
	selectIsLoading,
	(isLoading): boolean | undefined => isLoading[ModalType.firstConnection]
);
