const axios = require("axios");

const barcodeLookupAPI = axios.create({
  baseURL: "https://world.openfoodfacts.org/api/v2/search/",
});

export const searchProductByBarcode = (barcode) => {
  barcodeLookupAPI.get(barcode).then((resp) => {
    return resp.data.products[0].product_name;
  });
};
