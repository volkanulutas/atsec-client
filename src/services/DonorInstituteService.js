import axios from "axios";

import { API_BASE_URL, API_URL_DONOR_INSTITUTE } from "../constants";

class DonorInstituteService {
  getAllDonorInstitutes() {
    return axios.get(API_BASE_URL + API_URL_DONOR_INSTITUTE);
  }

  getDonorInstituteById(id) {
    return axios.get(API_BASE_URL + API_URL_DONOR_INSTITUTE + id);
  }

  createDonorInstitute(product) {
    return axios.post(API_BASE_URL + API_URL_DONOR_INSTITUTE, product);
  }

  updateDonorInstitute(id, product) {
    return axios.put(API_BASE_URL + API_URL_DONOR_INSTITUTE + id, product);
  }

  deleteDonorInstitute(id) {
    return axios.delete(API_BASE_URL + API_URL_DONOR_INSTITUTE + id);
  }
}

export default new DonorInstituteService();
