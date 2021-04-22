import axios from "axios";

import { API_BASE_URL, API_URL_USER } from "../constants";
import authHeader from "./AuthHeader"

class UserService {
  getAllUsers() {
    return axios.get(API_BASE_URL + API_URL_USER, {headers: authHeader()});
  }

  getUserById(id) {
    return axios.get(API_BASE_URL + API_URL_USER + id, {headers: authHeader()});
  }

  createUser(user) {
    return axios.post(API_BASE_URL + API_URL_USER, user, {headers: authHeader()});
  }

  updateUser(id, user) {
    return axios.put(API_BASE_URL + API_URL_USER + id, user), {headers: authHeader()};
  }

  deleteUser(id) {
    return axios.delete(API_BASE_URL + API_URL_USER + id, {headers: authHeader()});
  }
}

export default new UserService();
