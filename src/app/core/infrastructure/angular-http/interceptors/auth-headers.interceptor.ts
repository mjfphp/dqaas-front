import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LocalStorageServiceInterface } from '../../../../shared/local-storage/domain/services/local-storage.interface';
import { JWT_TOKEN_KEY } from '../../../domain/constants/storage.constants';

function nextWithJwtTokenHeader(req: HttpRequest<any>, next: HttpHandlerFn, localStorageServiceInterface: LocalStorageServiceInterface): Observable<HttpEvent<any>> {
  return next(req.clone({
    setHeaders: { Authorization: `Bearer ${localStorageServiceInterface.get(JWT_TOKEN_KEY)}` },
  }));
}

export function authHeadersInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const _localStorageServiceInterface = inject(LocalStorageServiceInterface);

  if (req.url.includes(environment.googleIssuer) || 
    req.url.includes(environment.microsoftIssuer) ||
    req.url.includes('/api/token')) {
		return next(req);
	}

  return nextWithJwtTokenHeader(req, next, _localStorageServiceInterface);

}
