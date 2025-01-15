import { FirstConnection } from "../../../core/domain/types/first-connection.type";
import { Modal } from "../domain/enums/modal.enum";


export type ModalState = {
	isOpened: Record<Modal, boolean>;
	data: { [Modal.firstConnection]: FirstConnection | undefined; };
	isLoading: Record<Modal, boolean | undefined>;
};

export const initialState: ModalState = {
	isOpened: {
		[Modal.firstConnection]: false,
	},
	data: {
		[Modal.firstConnection]: undefined,
	},
	isLoading: {
		[Modal.firstConnection]: false,
	}
};
