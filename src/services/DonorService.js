import axios from "axios";

import { API_BASE_URL, API_URL_DONOR } from "../constants";
import authHeader from "./AuthHeader"

class DonorService {
  getAllDonors() {
    return axios.get(API_BASE_URL + API_URL_DONOR);
  }

  getDonorById(id) {
    return axios.get(API_BASE_URL + API_URL_DONOR + id);
  }

  createDonor(donor) {
    return axios.post(API_BASE_URL + API_URL_DONOR, donor);
  }

  updateDonor(id, donor) {
    return axios.put(API_BASE_URL + API_URL_DONOR + id, donor);
  }

  deleteDonor(id) {
    return axios.delete(API_BASE_URL + API_URL_DONOR + id);
  }
}

export default new DonorService();
