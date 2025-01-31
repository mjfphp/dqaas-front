import { ModalType } from "../../../domain/enums/modal-type.enum";
import { ModalState } from "../../modal.state";

export function openCreateProjectModal(
    state: ModalState,
): ModalState {
    return {
        ...state,
        isOpened: {
            ...state.isOpened,
            [ModalType.projectForm]: true,
        },
        data: {
            ...state.data,
            [ModalType.projectForm]: undefined,
        },
        isLoading: {
            ...state.isLoading
        },
    };
}
