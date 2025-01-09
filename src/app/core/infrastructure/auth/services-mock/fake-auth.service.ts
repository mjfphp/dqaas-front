import { Injectable } from '@angular/core';
import { AuthServiceInterface } from '../../../domain/services/auth-service.interface';
import { AuthProvider } from '../../../../shared/enums/auth-provider.enum';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService implements AuthServiceInterface {

  private authenticated: boolean = false;

  constructor(private readonly _router: Router) { }

  login(authProvider: AuthProvider): void {
		of(delay(1000)).subscribe(() => {
      this.authenticated = true;
			void this._router.navigateByUrl('/login');
		});
	}

  hasValidAccessToken(): boolean {
    return this.authenticated;
  }

  getAccessToken(): string {
    return 'y0dfgdfgdfglkjdhfglksjehroileuqshfskdjfhsdf';
  }

  logout(): void {
    this.authenticated = false;
  }

}
