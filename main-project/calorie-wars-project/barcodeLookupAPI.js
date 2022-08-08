const axios = require("axios");

const barcodeLookupAPI = axios.create({
  baseURL: "https://world.openfoodfacts.org/api/v2/search/",
});

export const searchProductByBarcode = (barcode) => {
  return barcodeLookupAPI.get(barcode).then((resp) => {
    /*
    energy_unit: 'kcal',
    energy_value: 2,
    */
    const obj = resp.data.products[0];
    const retObj = {
      product_name: obj.product_name,
      energy: obj.nutriments["energy-kcal_100g"], // energy per 100 g
      energy_unit: obj.nutriments.energy_unit,
      serving_size: obj.serving_size,
    };
    /*
    console.log(
      "Total calories consumed: ",
      (retObj.energy * +retObj.serving_size.replace(/[a-z]+/i, "")) / 100
    );
    */
    return retObj;
  });
};

// const res = searchProductByBarcode("5060335635174");
