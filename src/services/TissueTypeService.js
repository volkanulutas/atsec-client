import axios from "axios";

import { API_BASE_URL, API_URL_TISSUE_TYPE } from "../constants";
import authHeader from "./AuthHeader"

class TissueTypeService {
  getAllTissueTypes() {
    return axios.get(API_BASE_URL + API_URL_TISSUE_TYPE, {headers: authHeader()});
  }

  getTissueTypeById(id) {
    return axios.get(API_BASE_URL + API_URL_TISSUE_TYPE + id, {headers: authHeader()});
  }

  createTissueType(tissueType) {
    return axios.post(API_BASE_URL + API_URL_TISSUE_TYPE, tissueType, {headers: authHeader()});
  }

  updateTissueType(id, tissueType) {
    return axios.put(API_BASE_URL + API_URL_TISSUE_TYPE + id, tissueType, {headers: authHeader()});
  }

  deleteTissueType(id) {
    return axios.delete(API_BASE_URL + API_URL_TISSUE_TYPE + id, {headers: authHeader()});
  }
}

export default new TissueTypeService();
