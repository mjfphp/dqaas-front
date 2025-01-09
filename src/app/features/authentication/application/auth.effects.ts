import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { authActions } from './auth.actions';
import { AuthServiceInterface } from '../../../core/domain/services/auth-service.interface';

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
        private readonly _authService : AuthServiceInterface) { }

}
