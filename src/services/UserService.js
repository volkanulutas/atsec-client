import axios from 'axios';

import { API_BASE_URL, API_URL_USER} from '../constants';

class UserService {

    getAllUsers(){
       return axios.get(API_BASE_URL + API_URL_USER);
    }

    getUserById(id) {
        return axios.get(API_BASE_URL + API_URL_USER + id);
    }

    createUser(user){
            console.log('create: user: ' + JSON.stringify(user) + " " + API_BASE_URL + API_URL_USER);
            return axios.post(API_BASE_URL + API_URL_USER, user);
        
    }

    updateUser(id, user) {
        console.log('update: id: ' + id + ' user: ' + JSON.stringify(user));
        return axios.put(API_BASE_URL + API_URL_USER + id, user);
    }

    deleteUser(id) {
        console.log('delete user: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_USER + id);
    }
}

export default new UserService();