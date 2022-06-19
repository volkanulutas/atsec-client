import axios from "axios";

import { API_BASE_URL, API_URL_PACKING_PRODUCT_BARCODE } from "../constants";
import authHeader from "./AuthHeader";

class PackingProductBarcodeService {
  getBarcode(packingProductId) {
    axios({
      url: API_BASE_URL + API_URL_PACKING_PRODUCT_BARCODE + packingProductId,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        "packingProduct" + packingProductId + ".pdf"
      ); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }
}
export default new PackingProductBarcodeService();
