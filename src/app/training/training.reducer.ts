import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import { Exercise } from './exercise.model';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING
} from './training.actions';

// declare a strict type
export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

// declare an initial state for when the app initially loads
const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

// here is our reducer function which checks the action dispatched against
// the UIActions file and it's constants
export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      // remember - below, since our interface above has multiple properties such
      // as availableExercises, finishedExercises, etc, if we don't add the
      // spread operator as a property in the new state, we will lose the old
      // properties. Adding the state spread operator updates the new available
      // exercises, AND keeps the other properties from the last state
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availableExercises.find(ex => ex.id === action.payload)
        }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>(
  'training'
);

// export an easy-to-reference variable for current uiState isLoading property
export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining !== null
);
