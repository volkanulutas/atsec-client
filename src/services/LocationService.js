import axios from "axios";

import { API_BASE_URL, API_URL_LOCATION } from "../constants";
import authHeader from "./AuthHeader"

class LocationService {
  getAllLocations() {
    return axios.get(API_BASE_URL + API_URL_LOCATION, {headers: authHeader()});
  }

  getLocationById(id) {
    return axios.get(API_BASE_URL + API_URL_LOCATION + id, {headers: authHeader()});
  }

  createLocation(location) {
    return axios.post(API_BASE_URL + API_URL_LOCATION, location, {headers: authHeader()});
  }

  updateLocation(id, location) {
    return axios.put(API_BASE_URL + API_URL_LOCATION + id, location, {headers: authHeader()});
  }

  deleteLocation(id) {
    return axios.delete(API_BASE_URL + API_URL_LOCATION + id, {headers: authHeader()});
  }
}

export default new LocationService();
