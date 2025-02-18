import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { catchError, map } from 'rxjs';
import { userActions } from './user.actions';
import { userFactory } from '../domain/functions/user-factory';
import { DecodedToken } from '../../authentication/domain/types/decoded-token.type';
import { User } from '../domain/types/user.type';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageServiceInterface } from '../../../shared/local-storage/domain/services/local-storage.interface';
import { JWT_TOKEN_KEY } from '../../../core/domain/constants/storage.constants';

@Injectable()
export class UserEffects {
	
	requestUser$ = createEffect(() =>
		this.actions$.pipe(
		  ofType(userActions.request),  // Écoute de l'action déclenchée
		  map(() => {

			const localDecodedToken = jwtDecode<DecodedToken>(this._localStorageServiceInterface.get(JWT_TOKEN_KEY) || '{}');
			
			const decodedToken: DecodedToken = {
				id:'1234',
				sub : localDecodedToken.sub,
				email: localDecodedToken.email,
				name: localDecodedToken.name,
				role: localDecodedToken.role,
			  };
			// Appel de la fonction userFactory pour transformer le DecodedToken en User
			const user: User = userFactory(decodedToken);
			return userActions.requestSuccess({ user });
		  }),
		  catchError(() => {
			return [userActions.requestFail()];
		  })
		)
	  );

	constructor(
		private readonly actions$: Actions,
		private readonly _localStorageServiceInterface: LocalStorageServiceInterface,
		) {}
}
