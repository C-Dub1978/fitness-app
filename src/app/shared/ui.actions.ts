import { Action } from '@ngrx/store';
// This is good practice to use const's with string values of each action
// for the associated reducer. This prevents your reducer function from being
// error prone with you having to manually type action.type string values in
// the reducer switch statement. Import this file in your reducer and use these
// const values in your switch!!!
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

// Even better, we can export these constants as 'action creators', so that
// we have class support for inline completion and strict typescript support
export class StartLoading implements Action {
  // remember an action always has to have a type property
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;
