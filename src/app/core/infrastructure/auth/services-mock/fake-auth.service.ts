import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { AuthServiceInterface } from '../../../domain/services/auth-service.interface';
import { AuthProvider } from '../enums/auth-provider.enum';

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
    return 'ya29.a0ARW5m76aL78TagzXrXUSv3CpFgHjWWfFSfrBN9y1gM9sxryObLHlgGdd4HODfbtbLDELniH8VQ2XgryF_VFQJgd7FAdhlfHRKNDhijnuVr0jXVgijjqp0x0xbjG8lkBHGgMxAIA2L86W9-OqJNJDnSzmC91fGsb5RwaCgYKAagSARISFQHGX2MivBSv0gdN_wI50lpdoljH5w0169';
  }

  logout(): void {
    this.authenticated = false;
  }

}
