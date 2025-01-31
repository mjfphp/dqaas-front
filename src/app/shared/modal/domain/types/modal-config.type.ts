import { Type, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs";
import { NzButtonType } from "ng-zorro-antd/button";
import { ModalType } from "../enums/modal-type.enum";

export type AppModalConfig = {
    type: ModalType;
    viewContainerRef: ViewContainerRef;
    title: string;
    content: Type<any>;
    onOk: () => void | Observable<any>;
    onCancel?: () => void | Observable<any>;
    data?: any;
    okType?: NzButtonType | undefined;
    okText?: string;
    cancelText?: string;
    closable?: boolean;
}
