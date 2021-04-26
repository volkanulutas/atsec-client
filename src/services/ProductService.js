import axios from "axios";

import { API_BASE_URL, API_URL_PRODUCT } from "../constants";
import authHeader from "./AuthHeader"

class ProductService {
  getAllProducts() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT, {headers: authHeader()});
  }

  getProductById(id) {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + id, {headers: authHeader()});
  }

  createProduct(product) {
    return axios.post(API_BASE_URL + API_URL_PRODUCT, product, {headers: authHeader()});
  }

  updateProduct(id, product) {
    return axios.put(API_BASE_URL + API_URL_PRODUCT + id, product, {headers: authHeader()});
  }

  deleteProduct(id) {
    return axios.delete(API_BASE_URL + API_URL_PRODUCT + id, {headers: authHeader()});
  }

  getPreprocessingTypeList() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + "preprocessingtypelist", {headers: authHeader()});
  }
}

export default new ProductService();
