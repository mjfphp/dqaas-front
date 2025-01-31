import { FirstConnection } from "../../../../../core/domain/types/first-connection.type";
import { ModalType } from "../../../domain/enums/modal-type.enum";
import { ModalState } from "../../modal.state";

export function openFirstConnectionModal(
    state: ModalState,
    { firstConnection }: { firstConnection: FirstConnection },
): ModalState {
    return {
        ...state,
        isOpened: {
            ...state.isOpened,
            [ModalType.firstConnection]: true,
        },
        data: {
            ...state.data,
            [ModalType.firstConnection]: firstConnection,
        },
        isLoading: {
            ...state.isLoading
        },
    };
}
