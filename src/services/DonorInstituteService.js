import axios from "axios";

import { API_BASE_URL, API_URL_DONOR_INSTITUTE } from "../constants";
import authHeader from "./AuthHeader"

class DonorInstituteService {
  getAllDonorInstitutes() {
    return axios.get(API_BASE_URL + API_URL_DONOR_INSTITUTE, {headers: authHeader()});
  }

  getDonorInstituteById(id) {
    return axios.get(API_BASE_URL + API_URL_DONOR_INSTITUTE + id, {headers: authHeader()});
  }

  createDonorInstitute(product) {
    return axios.post(API_BASE_URL + API_URL_DONOR_INSTITUTE, product, {headers: authHeader()});
  }

  updateDonorInstitute(id, product) {
    return axios.put(API_BASE_URL + API_URL_DONOR_INSTITUTE + id, product, {headers: authHeader()});
  }

  deleteDonorInstitute(id) {
    return axios.delete(API_BASE_URL + API_URL_DONOR_INSTITUTE + id, {headers: authHeader()});
  }
}

export default new DonorInstituteService();
