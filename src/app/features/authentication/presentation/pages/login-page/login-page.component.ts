import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AuthService } from '../../../../../core/authentication/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login-page',
  imports: [NzIconModule, NzDividerModule, NzSpaceModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(private readonly _authService: AuthService,
    private readonly oauthService: OAuthService) { }

  ngOnInit(): void {

    console.log('User profile : ', this._authService.isLoggedIn);

    if (this._authService.identityClaims) {
      this._authService.userProfile.subscribe(profile => {
        console.log('User profile : ', profile);
      });
    }

    this.oauthService.tryLogin({
      onTokenReceived: context => {
        console.debug("logged in");
        console.debug(context);
      }
    });
  }

  onGoogleLogin() {
    this._authService.loginGoogle();
  }

  onMicrosoftLogin() {
    this._authService.loginMicrosoft();
  }

  onLogout() {
    this._authService.logout();
  }

}
