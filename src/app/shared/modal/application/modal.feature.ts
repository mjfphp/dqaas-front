import { createFeature, createReducer, on } from "@ngrx/store";
import { initialState } from "./modal.state";
import { modalActions } from "./modal.actions";
import { openModal } from "./reducers/modal/open-modal";
import { closeModal } from "./reducers/modal/close-modal";
import { closeAllModals } from "./reducers/modal/close-all-modals";
import { openFirstConnectionModal } from "./reducers/first-connection/open-first-connection-modal";
import { updateState } from "./reducers/modal/update-state";

const modalFeature = createFeature({
    name: "modal",
    reducer: createReducer(
        initialState,
        on(modalActions.open, openModal),
        on(modalActions.updateState, updateState),
        on(modalActions.close, closeModal),
        on(modalActions.closeAll, closeAllModals),

        on(modalActions.openFirstConnection, openFirstConnectionModal),
    )
});

export const {
    name,
    reducer,
    selectIsOpened,
    selectData,
    selectIsLoading,
} = modalFeature;
