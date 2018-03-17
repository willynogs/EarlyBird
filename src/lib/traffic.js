/*
Traffic API
https://developers.google.com/maps/documentation/distance-matrix/intro#DistanceMatrixRequests
*/

import config from '../../config';

/* Get traffic from point A to point B, return promise */
export const getTraffic = (a, b) => {
  const { maps_key } = config;
  return new Promise((resolve, reject) => {
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${a.lat},${a.lon}&destinations=San+Francisco&key=${maps_key}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(response => {
        if(response.status == 200) {
          const json = JSON.parse(response._bodyText);
          resolve(json);  
        }
      }).catch(e => {
        reject(e);
      })
  });
};