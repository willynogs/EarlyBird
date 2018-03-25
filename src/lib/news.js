/*
News API
https://newsapi.org/
*/

import config from '../../config';

/* Gets the general news */
export const getAll = (country = 'us') => {
  return new Promise((resolve, reject) => {
    const { news_key } = config;
    fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${news_key}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      if(response.status == 200) {
        const json = JSON.parse(response._bodyText);
        resolve(json);
      }
    }).catch(e => {
      reject(e);
    })
  });
};
