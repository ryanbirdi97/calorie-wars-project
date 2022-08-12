const axios = require('axios');

const baseURL = 'https://api.calorieninjas.com/v1/nutrition?query=';

export const searchProductByText = (item) => {
  return axios
    .get(baseURL + item, {
      headers: {
        'X-Api-Key': '5BK3k9lTilvteSJpTEKL/w==QFaXdzkfX3RXoRxL',
      },
    })
    .then((result) => {
      return result.data.items;
    });
};
