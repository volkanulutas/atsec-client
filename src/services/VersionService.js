import axios from "axios";

import { API_BASE_URL, API_URL_VERSION } from "../constants";
import authHeader from "./AuthHeader"

class VersionService {
  getVersion() {
    return axios.get(API_BASE_URL + API_URL_VERSION, {headers: authHeader()});
  }
}

export default new VersionService();
