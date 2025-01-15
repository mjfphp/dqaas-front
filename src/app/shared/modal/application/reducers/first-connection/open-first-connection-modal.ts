import { FirstConnection } from "../../../../../core/domain/types/first-connection.type";
import { Modal } from "../../../domain/enums/modal.enum";
import { ModalState } from "../../modal.state";

export function openFirstConnectionModal(
    state: ModalState,
    { firstConnection }: { firstConnection: FirstConnection },
): ModalState {
    return {
        ...state,
        isOpened: {
            ...state.isOpened,
            [Modal.firstConnection]: true,
        },
        data: {
            ...state.data,
            [Modal.firstConnection]: firstConnection,
        },
        isLoading: {
            ...state.isLoading
        },
    };
}
