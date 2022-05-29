import axios from "axios";

import { API_BASE_URL, API_URL_PACKING_PRODUCT } from "../constants";
import authHeader from "./AuthHeader";

class PackingProductService {
  createProduct(product) {
    return axios.post(API_BASE_URL + API_URL_PACKING_PRODUCT, product, {
      headers: authHeader(),
    });
  }

  getAll() {
    return axios.get(API_BASE_URL + API_URL_PACKING_PRODUCT, {
      headers: authHeader(),
    });
  }

  getPackingProductById(id) {
    return axios.get(API_BASE_URL + API_URL_PACKING_PRODUCT + id, {
      headers: authHeader(),
    });
  }

  getPackingProductSizeList() {
    return axios.get(
      API_BASE_URL + API_URL_PACKING_PRODUCT + "packingproductsize",
      { headers: authHeader() }
    );
  }
}

export default new PackingProductService();
