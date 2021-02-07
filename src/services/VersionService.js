import axios from "axios";

import { API_BASE_URL, API_URL_VERSION } from "../constants";

class VersionService {
  getVersion() {
    return axios.get(API_BASE_URL + API_URL_VERSION);
  }
}

export default new VersionService();
