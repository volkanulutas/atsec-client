import axios from "axios";

import { API_BASE_URL, API_URL_USER } from "../constants";

class UserService {
  getAllUsers() {
    return axios.get(API_BASE_URL + API_URL_USER);
  }

  getUserById(id) {
    return axios.get(API_BASE_URL + API_URL_USER + id);
  }

  createUser(user) {
    return axios.post(API_BASE_URL + API_URL_USER, user);
  }

  updateUser(id, user) {
    return axios.put(API_BASE_URL + API_URL_USER + id, user);
  }

  deleteUser(id) {
    return axios.delete(API_BASE_URL + API_URL_USER + id);
  }
}

export default new UserService();
