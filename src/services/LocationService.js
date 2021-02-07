import axios from "axios";

import { API_BASE_URL, API_URL_LOCATION } from "../constants";

class LocationService {
  getAllLocations() {
    return axios.get(API_BASE_URL + API_URL_LOCATION);
  }

  getLocationById(id) {
    return axios.get(API_BASE_URL + API_URL_LOCATION + id);
  }

  createLocation(location) {
    return axios.post(API_BASE_URL + API_URL_LOCATION, location);
  }

  updateLocation(id, location) {
    return axios.put(API_BASE_URL + API_URL_LOCATION + id, location);
  }

  deleteLocation(id) {
    return axios.delete(API_BASE_URL + API_URL_LOCATION + id);
  }
}

export default new LocationService();
