import { ModalType } from "../../../domain/enums/modal-type.enum";
import { ModalState } from "../../modal.state";

export function closeModal(
    state: ModalState,
    { id }: { id: ModalType }
): ModalState {
    return {
        ...state,
        isOpened: { ...state.isOpened, [id]: false },
        data: { ...state.data, [id]: undefined },
        isLoading: { ...state.isLoading, [id]: false },
    };
}
