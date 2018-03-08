import { NavigationActions } from 'react-navigation';
import { combineReducers } from 'redux';
import { AppTabNavigator } from '../AppNavigator';

const firstAction = AppTabNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppTabNavigator.router.getStateForAction(firstAction);
const secondAction = AppTabNavigator.router.getActionForPathAndParams('Chat');
const initialNavState = AppTabNavigator.router.getStateForAction(secondAction, tempNavState);
function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppTabNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    case 'Logout':
      nextState = AppTabNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
      break;
    default:
      nextState = AppTabNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };
function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

export const AppReducer = combineReducers({
  nav,
  auth
});
