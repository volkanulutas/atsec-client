import axios from "axios";

import { API_BASE_URL, API_URL_PRODUCT } from "../constants";

class ProductService {
  getAllProducts() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT);
  }

  getProductById(id) {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + id);
  }

  createProduct(product) {
    return axios.post(API_BASE_URL + API_URL_PRODUCT, product);
  }

  updateProduct(id, product) {
    return axios.put(API_BASE_URL + API_URL_PRODUCT + id, product);
  }

  deleteProduct(id) {
    return axios.delete(API_BASE_URL + API_URL_PRODUCT + id);
  }
}

export default new ProductService();
