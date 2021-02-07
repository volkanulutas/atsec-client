import axios from "axios";

import { API_BASE_URL, API_URL_TISSUE_TYPE } from "../constants";

class TissueTypeService {
  getAllTissueTypes() {
    return axios.get(API_BASE_URL + API_URL_TISSUE_TYPE);
  }

  getTissueTypeById(id) {
    return axios.get(API_BASE_URL + API_URL_TISSUE_TYPE + id);
  }

  createTissueType(tissueType) {
    return axios.post(API_BASE_URL + API_URL_TISSUE_TYPE, tissueType);
  }

  updateTissueType(id, tissueType) {
    return axios.put(API_BASE_URL + API_URL_TISSUE_TYPE + id, tissueType);
  }

  deleteTissueType(id) {
    return axios.delete(API_BASE_URL + API_URL_TISSUE_TYPE + id);
  }
}

export default new TissueTypeService();
