import { Component, ViewContainerRef } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { Store } from '@ngrx/store';
import { authActions } from '../../../application/auth.actions';
import { AuthProvider } from '../../../../../core/infrastructure/auth/enums/auth-provider.enum';
import { AuthServiceInterface } from '../../../../../core/domain/services/auth-service.interface';
import { selectIsLoading, selectIsLoggedIn } from '../../../application/auth.feature';
import { FirstConnectionFormComponent } from '../../components/first-connection-form/first-connection-form.component';
import { selectModalOpened } from '../../../../../shared/modal/application/selectors/modal.selectors';
import { ModalType } from '../../../../../shared/modal/domain/enums/modal-type.enum';
import { ModalService } from '../../../../../shared/modal/domain/services/modal.service';
import { modalActions } from '../../../../../shared/modal/application/modal.actions';

@Component({
  selector: 'app-login-page',
  imports: [NgIf, AsyncPipe, NzIconModule, NzDividerModule, NzSpaceModule, NzModalModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  protected modalType = ModalType.firstConnection;
  protected isFirstConnectionModalOpened$ = this._store.select(selectModalOpened(this.modalType));
  protected isLoading$ = this._store.select(selectIsLoading);
  protected isLoginSuccessful$ = this._store.select(selectIsLoggedIn);

  constructor(private readonly _store: Store,
    private readonly _authService: AuthServiceInterface,
    private readonly _modalService: ModalService,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _router: Router) { }

  ngOnInit(): void {

    // Access Token handler
    if (this._authService.hasValidAccessToken()) {
      this._store.dispatch(authActions.startLoading());
      this._store.dispatch(authActions.accessTokenReceived());
      this._store.dispatch(authActions.generateJwt({ firstConnection: { projectCode: null } }));
    }

    // Handler to Open First Connection Modal
    this.isFirstConnectionModalOpened$.subscribe(isOpened => {
      if (isOpened) {
        this.openFirstConnectionModal();
      }
    });

    // Handler for Login Success
    this.isLoginSuccessful$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this._router.navigate(['/']).then(() => {
          this._store.dispatch(modalActions.close({ id: this.modalType }));
          this._store.dispatch(authActions.stopLoading());
        });
      }
    });

  }

  onGoogleLogin(): void {
    this._store.dispatch(authActions.login({ authProvider: AuthProvider.Google }));
  }

  onMicrosoftLogin(): void {
    this._store.dispatch(authActions.login({ authProvider: AuthProvider.Microsoft }));
  }

  openFirstConnectionModal(): void {
    const modalRef: NzModalRef = this._modalService.createComponentModal<FirstConnectionFormComponent>({
      type: this.modalType,
      viewContainerRef: this._viewContainerRef,
      title: 'Première Connexion',
      content: FirstConnectionFormComponent,
      onOk: () => (modalRef.getContentComponent() as FirstConnectionFormComponent).onSubmit(),
      onCancel: () => this._store.dispatch(authActions.logout()),
    });
  }

}
