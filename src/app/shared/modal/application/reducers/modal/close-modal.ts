import { Modal } from "../../../domain/enums/modal.enum";
import { ModalState } from "../../modal.state";

export function closeModal(
    state: ModalState,
    { id }: { id: Modal }
): ModalState {
    return {
        ...state,
        isOpened: { ...state.isOpened, [id]: false },
        data: { ...state.data, [id]: undefined },
        isLoading: { ...state.isLoading, [id]: false },
    };
}
