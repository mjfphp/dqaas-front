import {createFeature, createReducer, on} from '@ngrx/store';
import {initialState} from './user.state';
import { userActions } from './user.actions';
import { initUser } from './user.reducer';

const userFeature = createFeature({
	name: 'user',
	reducer: createReducer(
		initialState,
		on(userActions.requestSuccess, initUser),
	),
});

export const {
	name,
	reducer,
	selectUser,
} = userFeature;
