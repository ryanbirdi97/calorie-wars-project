const axios = require('axios');

const baseURL = 'https://api.calorieninjas.com/v1/nutrition?query=';

export const searchProductByText = (item) => {
  console.log(item, ' << quering with');
  return axios
    .get(baseURL + item, {
      headers: {
        'X-Api-Key': '5BK3k9lTilvteSJpTEKL/w==QFaXdzkfX3RXoRxL',
      },
    })
    .then((result) => {
      // console.log('calorieninja result: ', result.data.items);

      return result.data.items;
    });
};
