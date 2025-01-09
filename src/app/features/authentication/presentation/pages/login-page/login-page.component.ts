import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { Store } from '@ngrx/store';
import { authActions } from '../../../application/auth.actions';
import { AuthProvider } from '../../../../../shared/enums/auth-provider.enum';
import { AuthServiceInterface } from '../../../../../core/domain/services/auth-service.interface';

@Component({
  selector: 'app-login-page',
  imports: [NzIconModule, NzDividerModule, NzSpaceModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  isLoginInProgress: boolean = false;

  constructor(private readonly _authService: AuthServiceInterface,
    private readonly _store: Store) { }

  ngOnInit(): void {

    this.isLoginInProgress = this._authService.hasValidAccessToken();

    if (this._authService.hasValidAccessToken()) {
      console.log('login success : ', this._authService.hasValidAccessToken());
      this._store.dispatch(authActions.loginSuccess());
    }

  }

  onGoogleLogin() {
		this._store.dispatch(authActions.login({authProvider: AuthProvider.Google}));
  }

  onMicrosoftLogin() {
		this._store.dispatch(authActions.login({authProvider: AuthProvider.Microsoft}));
  }

  onLogout() {
    this._store.dispatch(authActions.logout());
  }

}
