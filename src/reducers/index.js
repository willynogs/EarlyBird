 /*
Reducers for Redux
https://redux.js.org/basics/reducers
*/

import { combineReducers } from 'redux';

/* User Reducer */
const user = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return Object.assign({}, state, action.user);
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
      return Object.assign({}, state, action.traffic);
    default:
      return state;
  }
};

/* News Reducer */
const news = (state = {}, action) => {
  switch(action.type) {
    case 'SET_BRIEF':
      return Object.assign({}, state, action.articles);
    case 'SET_CATEGORY':
      return Object.assign({}, state, { category: action.category });
    default:
      return state;
  }
};

export default combineReducers({
  user,
  traffic,
  news
});
