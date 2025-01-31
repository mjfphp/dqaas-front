import { ModalType } from "../../../domain/enums/modal-type.enum";
import { ModalState } from "../../modal.state";

export function updateState(
    state: ModalState,
    { id, data, isLoading }: { id: ModalType; data: any; isLoading: boolean },
): ModalState {
    return {
        ...state,
        data: {
            ...state.data,
            [id]: data,
         },
        isLoading: {
            ...state.isLoading,
            [id]: isLoading,
        },
    };
}
