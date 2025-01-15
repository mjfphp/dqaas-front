import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { NotificationService } from "../../../../shared/notification/domain/services/notification.service";
import { NotificationType } from "../../../../shared/notification/domain/enums/notification-type.enum";
import { LocalStorageServiceInterface } from "../../../../shared/local-storage/domain/services/local-storage.interface";
import { JWT_TOKEN_KEY } from "../../../domain/constants/storage.constants";

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _router = inject(Router);
  const _notificationService = inject(NotificationService);
  const _localStorageServiceInterface = inject(LocalStorageServiceInterface);

  return next(req).pipe(
    catchError(error => {
      
      let notificationType = NotificationType.error;
      let errorMessage = 'Une erreur inattendue s\'est produite.';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.error.status) {
          case 400:
            notificationType = NotificationType.warning;
            errorMessage = error.error.message || 'Requête invalide. Veuillez vérifier vos données.';
            break;
          case 401:
            notificationType = NotificationType.info;
            errorMessage = error.error.message || 'Non autorisé. Veuillez vous reconnecter.';
            _localStorageServiceInterface.remove(JWT_TOKEN_KEY);
            _router.navigate(['/login']);
            break;
          case 403:
            errorMessage = error.error.message || 'Accès refusé. Vous n\'avez pas la permission d\'accéder à cette ressource.';
            break;
          case 404:
            notificationType = NotificationType.info;
            errorMessage = error.error.message || 'Ressource introuvable.';
            break;
          case 500:
            errorMessage = error.error.message || 'Erreur interne du serveur. Veuillez réessayer plus tard.';
            break;
          default:
            notificationType = handleDefaultErrorNotificationType(error.error.status);
            errorMessage = error.error.message || `Erreur ${error.error.status} : ${error.error.message}`;
            break;
        }
      }

      // Display a notification containing the error message to inform the user about the issue
      _notificationService.createNotification({
        type: notificationType,
        title: error.error.error,
        content: errorMessage,
      });

      // Log the error for debugging (optional)
      console.error(`HTTP Error: ${errorMessage}`, error);

      // Return the error
      return throwError(() => error);
      
    })
  );

}

function handleDefaultErrorNotificationType(status: number): NotificationType {
  if (status >= 400 && status < 500) {
    // Handle 4xx client-side errors
    return NotificationType.warning;
  } else {
    // Handle 5xx server-side errors or any other status codes (e.g., 100-199, 300-399)
    return NotificationType.error;
  }
}