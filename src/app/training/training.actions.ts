import { Action } from '@ngrx/store';
// This is good practice to use const's with string values of each action
// for the associated reducer. This prevents your reducer function from being
// error prone with you having to manually type action.type string values in
// the reducer switch statement. Import this file in your reducer and use these
// const values in your switch!!!
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finishes Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

// Even better, we can export these constants as 'action creators', so that
// we have class support for inline completion and strict typescript support
export class SetAvailableTrainings implements Action {
  // remember an action always has to have a type property
  readonly type = SET_AVAILABLE_TRAININGS;
  // Since this action will be passing an actual payload instead of just a
  // boolean, we must inject the payload into this class constructor
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
