import { Modal } from "../../../domain/enums/modal.enum";
import { ModalState } from "../../modal.state";

export function openModal(
    state: ModalState,
    { id }: { id: Modal }
): ModalState {
    return {
        ...state,
        isOpened: { ...state.isOpened, [id]: true }
    };
}
