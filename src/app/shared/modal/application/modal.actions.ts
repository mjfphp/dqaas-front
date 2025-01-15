import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Modal } from "../domain/enums/modal.enum";
import { FirstConnection } from "../../../core/domain/types/first-connection.type";

export const modalActions = createActionGroup({
	source: 'Modal',
	events: {
		open: props<{ id: Modal }>(),
		updateState: props<{ id: Modal; data: any; isLoading: boolean }>(),
		close: props<{ id: Modal }>(),
		closeAll: emptyProps(),

		openFirstConnection: props<{ firstConnection: FirstConnection }>(),
	},
});
