const axios = require('axios');

const barcodeLookupAPI = axios.create({
  baseURL: 'https://world.openfoodfacts.org/api/v2/search/',
});

export const searchProductByBarcode = (barcode, setNotFoundFromBarcodeApi) => {
  console.log('fetching from API');
  return barcodeLookupAPI.get(barcode).then((resp) => {
    if (resp.data.products.length === 0) {
      setNotFoundFromBarcodeApi(true);
      return;
    }
    const obj = resp.data.products[0];
    const retObj = {
      product_name: obj.product_name,
      energy: obj.nutriments['energy-kcal_100g'], // energy per 100 g
      energy_unit: obj.nutriments.energy_unit,
      serving_size: obj.serving_size,
    };
    setNotFoundFromBarcodeApi(false);
    return retObj;
  });
};
