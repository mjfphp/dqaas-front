import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { AppNotificationConfig } from "../types/notification-config.type";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private readonly _nzNotificationService: NzNotificationService) { }

    createNotification(notificationConfig: AppNotificationConfig): void {
        this._nzNotificationService.create(
            notificationConfig.type,
            notificationConfig.title,
            notificationConfig.content,
            {
                nzKey: notificationConfig.options?.key,
                nzData: notificationConfig.options?.data,
                nzDuration: notificationConfig.options?.duration,
                nzStyle: notificationConfig.options?.style,
                nzClass: notificationConfig.options?.class,
                nzPlacement: notificationConfig.options?.placement,
            }
        );
    }

}