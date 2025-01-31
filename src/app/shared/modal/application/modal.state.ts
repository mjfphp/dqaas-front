import { ModalType } from "../domain/enums/modal-type.enum";

export type ModalState = {
	isOpened: Record<ModalType, boolean>;
	data: Record<ModalType, any | undefined>;
	isLoading: Record<ModalType, boolean | undefined>;
};

export const initialState: ModalState = {
	isOpened: {
		[ModalType.firstConnection]: false,
		[ModalType.projectForm]: false,
	},
	data: {
		[ModalType.firstConnection]: undefined,
		[ModalType.projectForm]: undefined,
	},
	isLoading: {
		[ModalType.firstConnection]: false,
		[ModalType.projectForm]: false,
	}
};
