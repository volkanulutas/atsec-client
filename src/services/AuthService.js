import axios from 'axios';

import { API_BASE_URL, API_URL_AUTH} from '../constants';

class AuthService {

    changePassword(changePassword){
        console.log('create: changePassword: ' + JSON.stringify(changePassword));
        return axios.post(API_BASE_URL + API_URL_AUTH + "change-password", changePassword);
    }

    forgetPassword(userRequest){
        console.log('create: forget Password: ' + JSON.stringify(userRequest));
        return axios.post(API_BASE_URL + API_URL_AUTH + "forget-password", userRequest);
    }

    login(loginRequest){
        console.log('create: login: ' + JSON.stringify(loginRequest));
        return axios.post(API_BASE_URL + API_URL_AUTH + "signin", loginRequest);
    }
}

export default new AuthService();