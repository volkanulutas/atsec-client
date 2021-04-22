import axios from "axios";

import { API_BASE_URL, API_URL_PERMISSION } from "../constants";
import authHeader from "./AuthHeader"

class PermissionService {
  getAllPermissions() {
    return axios.get(API_BASE_URL + API_URL_PERMISSION);
  }

  getPermissionById(id) {
    return axios.get(API_BASE_URL + API_URL_PERMISSION + id);
  }

  createPermission(permission) {
    return axios.post(API_BASE_URL + API_URL_PERMISSION, permission);
  }

  updatePermission(id, permission) {
    return axios.put(API_BASE_URL + API_URL_PERMISSION + id, permission);
  }

  deletePermission(id) {
    return axios.delete(API_BASE_URL + API_URL_PERMISSION + id);
  }
}

export default new PermissionService();
