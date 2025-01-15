import { Modal } from "../../../domain/enums/modal.enum";
import { ModalState } from "../../modal.state";

export function updateState(
    state: ModalState,
    { id, data, isLoading }: { id: Modal; data: any; isLoading: boolean },
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
