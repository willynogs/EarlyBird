/*
Weather API
https://openweathermap.org/
*/

import config from '../../config';

/* The get function takes a location and returns a promise with the weathr for the given location */
export const get = (lat, lon) => {
  return new Promise((resolve, reject) => {
    const { weather_key } = config;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weather_key}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if(response.status == 200) {
        const json = JSON.parse(response._bodyText);
        resolve(json);
      }
    })
    .catch(e => {
      reject(e);
    });
  });
};
