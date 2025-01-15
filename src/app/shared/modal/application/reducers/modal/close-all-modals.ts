import { ModalState, initialState } from "../../modal.state";

export function closeAllModals(state: ModalState): ModalState {
    return {
        ...state,
        isOpened: initialState.isOpened
    };
}
