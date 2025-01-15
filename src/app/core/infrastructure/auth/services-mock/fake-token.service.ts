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
      jwtToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg5Y2UzNTk4YzQ3M2FmMWJkYTRiZmY5NWU2Yzg3MzY0NTAyMDZmYmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NDI3MTc3NTY2NzUtczZiNjNtODVoZDltOGtvY25oZGtqbDltc3Y5dGtkcDkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NDI3MTc3NTY2NzUtczZiNjNtODVoZDltOGtvY25oZGtqbDltc3Y5dGtkcDkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc1MTg5MzQyNTI0NDMyNjc0NDQiLCJlbWFpbCI6InNhYWR0aW5hbmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJVRFZPWWZSMGpfSHY1d2RKWk8yUEpRIiwibm9uY2UiOiJTRmgyYzFsd2NGTjNaMUE1UVZodldYcFNURmhRYm1SdmNtWnNZelp0TWtVNFkwcDNibVJSYjBZd1pGVlEiLCJuYmYiOjE3MzY0NDE3OTMsIm5hbWUiOiJTYWFkIFRpbmFuaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJMVVfQWdvOWZOV2VxUnhOVXh5VE1fRm0zOHIteEFhVm16MmMtb2lYbndVLTNIbDVVPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNhYWQiLCJmYW1pbHlfbmFtZSI6IlRpbmFuaSIsImlhdCI6MTczNjQ0MjA5MywiZXhwIjoxNzM2NDQ1NjkzLCJqdGkiOiJkNjNkYzc1ZWZmNjI1MGViYzBkNzNhMjRiMGM4MjExOGRiMzczOTZjIn0.R94j7x_86zH2QHpYAI6vdfIDNsSyR3tDRn_954P2ZJMjsvghpirKp3zuxx1hamEnurwXF_Yd0slM4lAUelbXhsWlko31KJRx0uyCHZ0NH5zG-58oSxFB-5UOcZL5rC6uajPJlmyOgE4Ch8hlpbsosuTyuPzo9ekwKhnzjfaFjG0OfQY9yF2dmdSHL-07GhDi3hsG5Uh_2uOV5WorP4U81jQQBxHHAGwQWwj8xOc37CQe3I7dGXAnVFBasR8ViDXFeo7qIbvI5LkDEHdwy6f8X8qRvM6R7Kd2EkOi_0D47AfGcNRqjnvA--AiMG53gR3nCsM4C4jyWronyXw6Ov5rjQ'
    }).pipe(
      delay(randomDelay)
    );
  }

}
