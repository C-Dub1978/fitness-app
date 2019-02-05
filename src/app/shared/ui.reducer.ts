import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';

// declare a strict type
export interface State {
  isLoading: boolean;
}

// declare an initial state for when the app initially loads
const initialState: State = {
  isLoading: false
};

// here is our reducer function which checks the action dispatched against
// the UIActions file and it's constants
export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default: {
      return state;
    }
  }
}

// export an easy-to-reference variable for current uiState isLoading property
export const getIsLoading = (state: State) => state.isLoading;
