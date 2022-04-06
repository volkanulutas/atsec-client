import axios from "axios";

import { API_BASE_URL, API_URL_PRODUCT } from "../constants";
import authHeader from "./AuthHeader"

class ProductService {

  getAllPackingProducts() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + "packing", {headers: authHeader()});
  }

  getAllPreprocessingProducts() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + "preprocessing", {headers: authHeader()});
  }

  getAllProducts() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT, {headers: authHeader()});
  }

  getProductById(id) {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + id, {headers: authHeader()});
  }

  createProduct(product) {
    return axios.post(API_BASE_URL + API_URL_PRODUCT, product, {headers: authHeader()});
  }

  createBarcode(id) {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + "createbarcode/" + id, {headers: authHeader()});
  }

  updateProduct(id, product) {
    console.log(JSON.stringify(product));
    return axios.put(API_BASE_URL + API_URL_PRODUCT + id, product, {headers: authHeader()});
  }

  deleteProduct(id) {
    return axios.delete(API_BASE_URL + API_URL_PRODUCT + id, {headers: authHeader()});
  }

  getPreprocessingTypeList() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + "preprocessingtypelist", {headers: authHeader()});
  }

  getWashingTypeList() {
    return axios.get(API_BASE_URL + API_URL_PRODUCT + "washingtypelist", {headers: authHeader()}); 
  }
}

export default new ProductService();
