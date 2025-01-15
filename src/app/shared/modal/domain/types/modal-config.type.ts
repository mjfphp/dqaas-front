import { Type, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs";
import { NzButtonType } from "ng-zorro-antd/button";
import { Modal } from "../enums/modal.enum";

export type AppModalConfig = {
    type: Modal;
    viewContainerRef: ViewContainerRef;
    title: string;
    content: Type<any>;
    onOk: () => void | Observable<any>;
    onCancel: () => void | Observable<any>;
    data?: any;
    okType?: NzButtonType | undefined;
    okText?: string;
    cancelText?: string;
    closable?: boolean;
};
