import axios from "axios";

import { API_BASE_URL, API_URL_AUTH } from "../constants";

class AuthService {
  changePassword(changePassword) {
    return axios.post(
      API_BASE_URL + API_URL_AUTH + "change-password",
      changePassword
    );
  }

  forgetPassword(userRequest) {
    return axios.post(
      API_BASE_URL + API_URL_AUTH + "forget-password",
      userRequest
    );
  }

  login(loginRequest) {
    return axios.post(API_BASE_URL + API_URL_AUTH + "signin", loginRequest);
  }
}

export default new AuthService();
