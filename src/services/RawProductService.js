import axios from "axios";

import { API_BASE_URL, API_URL_RAWPRODUCT } from "../constants";
import authHeader from "./AuthHeader"

class RawProductService {
  getAllRawProducts() {
    return axios.get(API_BASE_URL + API_URL_RAWPRODUCT, {headers: authHeader()});
  }

  getRejectArchivesRawProducts() {
    return axios.get(API_BASE_URL + API_URL_RAWPRODUCT + "rejectarchives", {headers: authHeader()});
  }

  getRawProductById(id) {
    return axios.get(API_BASE_URL + API_URL_RAWPRODUCT + id, {headers: authHeader()});
  }

  createRawProduct(product) {
    return axios.post(API_BASE_URL + API_URL_RAWPRODUCT, product, {headers: authHeader()});
  }

  updateRawProduct(id, product) {
    return axios.put(API_BASE_URL + API_URL_RAWPRODUCT + id, product), {headers: authHeader()};
  }

  deleteRawProduct(id) {
    return axios.delete(API_BASE_URL + API_URL_RAWPRODUCT + id, {headers: authHeader()});
  }
  
  // TODO: file yapısına authHeader nasıl eklenmelidir.
  upload(file, fileType, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);

    return axios.post(API_BASE_URL + API_URL_RAWPRODUCT + "upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(fileType) {
    return axios.get(
      API_BASE_URL + API_URL_RAWPRODUCT + "getFiles/" + fileType
    );
  }

  downloadRawProductBarcode() {
    axios({
      url: API_BASE_URL + API_URL_RAWPRODUCT + "barcode",
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }
}

export default new RawProductService();
