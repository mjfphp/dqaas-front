import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, concatMap, of, switchMap, tap } from 'rxjs';
import { authActions } from './auth.actions';
import { AuthServiceInterface } from '../../../core/domain/services/auth-service.interface';
import { TokenServiceInterface } from '../../../core/domain/services/token-service.interface';
import { modalActions } from '../../../shared/modal/application/modal.actions';
import { Modal } from '../../../shared/modal/domain/enums/modal.enum';
import { LocalStorageServiceInterface } from '../../../shared/local-storage/domain/services/local-storage.interface';
import { JWT_TOKEN_KEY } from '../../../core/domain/constants/storage.constants';

@Injectable()
export class AuthEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.login),
            tap(action => {
                this._authService.login(action.authProvider);
            }),
        ),
        { dispatch: false }
    );

    generateJwt$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.generateJwt),
            switchMap(action => {
                return this._tokenService.generateJwtToken(action.firstConnection).pipe(
                    tap(response => {
                        console.log('jwt : ', response);
                        this._localStorageServiceInterface.set(JWT_TOKEN_KEY, response.jwtToken);
                    }),
                    concatMap(() => [authActions.loginSuccess()]),
                    catchError(error => {
                        if (error.status === 400) {
                            return concat(
                                of(modalActions.updateState({ id: Modal.firstConnection, data: action.firstConnection, isLoading: false })),
                                of(modalActions.openFirstConnection({ firstConnection: action.firstConnection })),
                            );
                        }
                        return of(authActions.loginError());
                    }),
                )
            }
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.logout),
            tap(() => {
                this._authService.logout();
            }),
        ),
        { dispatch: false }
    );

    constructor(private readonly actions$: Actions,
        private readonly _authService: AuthServiceInterface,
        private readonly _tokenService: TokenServiceInterface,
        private readonly _localStorageServiceInterface: LocalStorageServiceInterface) { }

}
