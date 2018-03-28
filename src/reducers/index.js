 /*
Reducers for Redux
https://redux.js.org/basics/reducers
*/

import { combineReducers } from 'redux';
import { setUser, setTraffic } from '../actions';

/* User Reducer */
const user = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return Object.assign({}, state, action.user._user);
    case 'SET_USER_LOCATION':
      return Object.assign({}, state, { coords: action.coords });
    default:
      return state;
  }
};

/* Traffic Reducer */
const traffic = (state = {}, action) => {
  switch(action.type) {
    case 'SET_TRAFFIC':
      return Object.assign(state, action.traffic);
    default:
      return state;
  }
};

export default combineReducers({
  user,
  traffic
});
