import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// This file is now used to merge ALL our reducers to a central file

// Remember that this State interface is made up of 'slices', each slice being
// a different reducer that we have built
export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

// The following type is an ActionReducerMap, which is literally a map of all
// your reducer FUNCTIONS inside your reducer files
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

// Define a utility function to get ui state
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(
  getUiState,
  fromUi.getIsLoading
);

// Define a utility function to get auth state
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(
  getAuthState,
  fromAuth.getIsAuth
);
