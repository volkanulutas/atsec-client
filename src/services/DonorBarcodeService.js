import axios from "axios";

import { API_BASE_URL, API_URL_DONOR_BARCODE } from "../constants";
import authHeader from "./AuthHeader";

class DonorBarcodeService {
  getBarcode(rawProductId) {
    axios({
      url: API_BASE_URL + API_URL_DONOR_BARCODE + rawProductId,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "donorBarcode_" + rawProductId + ".pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }
}

export default new DonorBarcodeService();
