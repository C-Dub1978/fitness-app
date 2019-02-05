import { Action } from '@ngrx/store';
// This is good practice to use const's with string values of each action
// for the associated reducer. This prevents your reducer function from being
// error prone with you having to manually type action.type string values in
// the reducer switch statement. Import this file in your reducer and use these
// const values in your switch!!!
export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

// Even better, we can export these constants as 'action creators', so that
// we have class support for inline completion and strict typescript support
export class SetAuthenticated implements Action {
  // remember an action always has to have a type property
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
