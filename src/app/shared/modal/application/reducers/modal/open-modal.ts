import { ModalType } from "../../../domain/enums/modal-type.enum";
import { ModalState } from "../../modal.state";

export function openModal(
    state: ModalState,
    { id }: { id: ModalType }
): ModalState {
    return {
        ...state,
        isOpened: { ...state.isOpened, [id]: true }
    };
}
