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

export const setNewsBrief = (articles) => {
  return {
    type: 'SET_BRIEF',
    articles
  }
};

export const setNewsCategory = (category) => {
  return {
    type: 'SET_CATEGORY',
    category
  }
};
