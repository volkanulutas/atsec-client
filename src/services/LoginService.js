import axios from "axios";

import { API_BASE_URL, CONFIG } from "../constants";

class LoginService {
  login(username, password) {
    return axios.post(
      API_BASE_URL + "/auth/signin",
      {
        username: username,
        password: password,
      },
      CONFIG
    );
  }
}

export default new LoginService();
