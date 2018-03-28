/*
Actions for Redux
https://redux.js.org/basics/actions
*/

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  };
};

export const setUserLocation = (coords) => {
  return {
    type: 'SET_USER_LOCATION',
    coords
  }
};

export const setTraffic = (traffic) => {
  return {
    type: 'SET_TRAFFIC',
    traffic
  }
};
