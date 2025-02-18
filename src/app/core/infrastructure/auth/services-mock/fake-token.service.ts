import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, of, throwError, timer } from 'rxjs';
import { TokenServiceInterface } from '../../../domain/services/token-service.interface';
import { JwtToken } from '../../../domain/types/jwt-token.type';

@Injectable({
  providedIn: 'root'
})
export class FakeTokenService implements TokenServiceInterface {

  private isError: boolean = true;

  generateJwtToken(): Observable<JwtToken> {
    const randomDelay = Math.floor(Math.random() * 2000) + 1000;

    if (this.isError) {
      this.isError = !this.isError;

      return timer(randomDelay).pipe(
        concatMap(() =>
          throwError(() => ({
            status: 400,
            error: 'Bad Request',
            message: 'PROJECT_CODE_REQUIRED',
          }))
        )
      );
    }

    return of({
      jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYWFkdGluYW5pQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTczOTU0OTMxN30.49Fhz1sVK0O2NVucJSccuFHF3s_UlVFFZY5PO3WEcCk'
    }).pipe(
      delay(randomDelay)
    );
  }

}
