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

  downloadRawProductBarcode() {
    axios({
      url: API_BASE_URL + API_URL_RAWPRODUCT + "barcode",
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      alert("ss");
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
