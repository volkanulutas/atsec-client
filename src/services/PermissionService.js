import axios from "axios";

import { API_BASE_URL, API_URL_PERMISSION } from "../constants";
import authHeader from "./AuthHeader"

class PermissionService {
  getAllPermissions() {
    return axios.get(API_BASE_URL + API_URL_PERMISSION, {headers: authHeader()});
  }

  getPermissionById(id) {
    return axios.get(API_BASE_URL + API_URL_PERMISSION + id), {headers: authHeader()};
  }

  createPermission(permission) {
    return axios.post(API_BASE_URL + API_URL_PERMISSION, permission, {headers: authHeader()});
  }

  updatePermission(id, permission) {
    return axios.put(API_BASE_URL + API_URL_PERMISSION + id, permission, {headers: authHeader()});
  }

  deletePermission(id) {
    return axios.delete(API_BASE_URL + API_URL_PERMISSION + id, {headers: authHeader()});
  }
}

export default new PermissionService();
