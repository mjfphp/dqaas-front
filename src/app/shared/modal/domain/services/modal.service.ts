import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { Observable } from "rxjs";
import { modalActions } from "../../application/modal.actions";
import { AppModalConfig } from "../types/modal-config.type";
import { selectModalLoading } from "../../application/selectors/modal.selectors";

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    protected readonly CANCEL_TEXT = 'Annuler';
    protected readonly CONFIRM_TEXT = 'Confirmer';
    protected readonly PRIMARY_TYPE = 'primary';

    constructor(private readonly _store: Store,
        private readonly _nzModalService: NzModalService) { }

    createComponentModal<T>(modalConfig: AppModalConfig): NzModalRef {
        let isFirstConnectionModalLoading$ = this._store.select(selectModalLoading(modalConfig.type));

        return this._nzModalService.create<T>({
            nzTitle: modalConfig.title,
            nzContent: modalConfig.content,
            nzViewContainerRef: modalConfig.viewContainerRef,
            nzData: modalConfig.data,
            nzClosable: modalConfig.closable,
            nzMaskClosable: false,
            nzFooter: [
                {
                    // shape: 'round',
                    label: modalConfig.cancelText || this.CANCEL_TEXT,
                    onClick: () => {
                        if (modalConfig.onCancel) {
                            const result = modalConfig.onCancel();
                            if (result instanceof Observable) {
                                result.subscribe();
                            }
                        } else {
                            this._store.dispatch(modalActions.close({ id: modalConfig.type }));
                        }
                    }
                },
                {
                    loading: false,
                    type: modalConfig.okType || this.PRIMARY_TYPE,
                    label: modalConfig.okText || this.CONFIRM_TEXT,
                    onClick(): void {
                        this.loading = true;
                        isFirstConnectionModalLoading$.subscribe(isLoading => {
                            this.loading = isLoading;
                        });
                        modalConfig.onOk();
                    }
                },
            ]
        });
    }

}