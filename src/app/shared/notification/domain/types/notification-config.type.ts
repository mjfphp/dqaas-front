import { TemplateRef } from '@angular/core';
import { NzNotificationPlacement } from 'ng-zorro-antd/notification';
import { NotificationType } from '../enums/notification-type.enum';

export type AppNotificationConfig = {
    type: NotificationType;
    title: string | TemplateRef<void>;
    content: string | TemplateRef<void>;
    options?: {
        key?: string;
        data?: any;
        duration?: number;
        style?: object;
        class?: object;
        placement?: NzNotificationPlacement;
    };
};
