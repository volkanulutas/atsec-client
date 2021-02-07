import axios from "axios";

import { API_BASE_URL, API_URL_RAWPRODUCT } from "../constants";

class RawProductService {
  getAllRawProducts() {
    return axios.get(API_BASE_URL + API_URL_RAWPRODUCT);
  }

  getRejectArchivesRawProducts() {
    return axios.get(API_BASE_URL + API_URL_RAWPRODUCT + "rejectarchives");
  }

  getRawProductById(id) {
    return axios.get(API_BASE_URL + API_URL_RAWPRODUCT + id);
  }

  createRawProduct(product) {
    return axios.post(API_BASE_URL + API_URL_RAWPRODUCT, product);
  }

  updateRawProduct(id, product) {
    return axios.put(API_BASE_URL + API_URL_RAWPRODUCT + id, product);
  }

  deleteRawProduct(id) {
    return axios.delete(API_BASE_URL + API_URL_RAWPRODUCT + id);
  }

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
}

export default new RawProductService();
