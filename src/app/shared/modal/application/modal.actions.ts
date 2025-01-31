import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ModalType } from "../domain/enums/modal-type.enum";
import { FirstConnection } from "../../../core/domain/types/first-connection.type";
import { Project } from "../../../features/projects/domain/types/project.type";

export const modalActions = createActionGroup({
	source: 'Modal',
	events: {
		open: props<{ id: ModalType }>(),
		updateState: props<{ id: ModalType; data: any; isLoading: boolean }>(),
		close: props<{ id: ModalType }>(),
		closeAll: emptyProps(),

		openFirstConnection: props<{ firstConnection: FirstConnection }>(),
		openCreateProjectModal: emptyProps(),
	},
});
