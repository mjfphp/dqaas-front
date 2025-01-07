import { Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AuthService } from '../../../../../core/authentication/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [NzIconModule, NzDividerModule, NzSpaceModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
    if (this._authService.identityClaims) {
      this._authService.userProfile.subscribe(profile => {
        console.log('User profile : ', profile);
      });
    }
  }

  onLogin() {
    this._authService.login();
  }

}
