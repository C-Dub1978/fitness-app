import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from './auth.actions';

// declare a strict type
export interface State {
  isAuthenticated: boolean;
}

// declare an initial state for when the app initially loads
const initialState: State = {
  isAuthenticated: false
};

// here is our reducer function which checks the action dispatched against
// the UIActions file and it's constants
export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

// export an easy-to-reference variable for current uiState isLoading property
export const getIsAuth = (state: State) => state.isAuthenticated;
