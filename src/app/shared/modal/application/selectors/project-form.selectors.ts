import { createSelector } from "@ngrx/store";
import { selectData, selectIsLoading } from "../modal.feature";
import { ModalType} from "../../domain/enums/modal-type.enum";
import { Project } from "../../../../features/projects/domain/types/project.type";

export const selectProjectFormData = createSelector(
	selectData,
	(data): Project | undefined => data[ModalType.projectForm]
);

export const selectProjectFormLoading = createSelector(
	selectIsLoading,
	(isLoading): boolean | undefined => isLoading[ModalType.projectForm]
);
