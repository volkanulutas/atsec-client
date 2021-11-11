import axios from "axios";

import { API_BASE_URL, API_URL_DONOR } from "../constants";
import authHeader from "./AuthHeader"

class DonorService {
  getAllDonors() {
    return axios.get(API_BASE_URL + API_URL_DONOR, {headers: authHeader()});
  }

  getDonorById(id) {
    return axios.get(API_BASE_URL + API_URL_DONOR + id, {headers: authHeader()});
  }

  createDonor(donor) {
    alert(API_BASE_URL + API_URL_DONOR );
    return axios.post(API_BASE_URL + API_URL_DONOR, donor, {headers: authHeader()});
  }

  updateDonor(id, donor) {
    alert(API_BASE_URL + API_URL_DONOR + id);
    return axios.put(API_BASE_URL + API_URL_DONOR + id, donor, {headers: authHeader()});
  }

  deleteDonor(id) {
    return axios.delete(API_BASE_URL + API_URL_DONOR + id, {headers: authHeader()});
  }

  getBloodTypeList(){
    return axios.get(API_BASE_URL + API_URL_DONOR + "bloodtype/", {headers: authHeader()});
  }

  getSexList(){
    return axios.get(API_BASE_URL + API_URL_DONOR + "sex/", {headers: authHeader()});
  }

  getCities(){
    return axios.get(API_BASE_URL + API_URL_DONOR + "cities/", {headers: authHeader()});
  }
  getDistrict(city){
    return axios.get(API_BASE_URL + API_URL_DONOR + "district/"+ city, {headers: authHeader()});
  }
}

export default new DonorService();
