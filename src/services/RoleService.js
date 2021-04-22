import axios from 'axios';

import { API_BASE_URL, API_URL_ROLE} from '../constants';
import authHeader from "./AuthHeader"

class RoleService {

    getAllRoles(){
       return axios.get(API_BASE_URL + API_URL_ROLE, {headers: authHeader()});
    }

    getRoleById(id) {
        return axios.get(API_BASE_URL + API_URL_ROLE + id, {headers: authHeader()});
    }

    createRole(role){
        return axios.post(API_BASE_URL + API_URL_ROLE, role, {headers: authHeader()});
    }

    updateRole(id, role) {
        return axios.put(API_BASE_URL + API_URL_ROLE + id, role, {headers: authHeader()});
    }

    deleteRole(id){
        return axios.delete(API_BASE_URL + API_URL_ROLE + id, {headers: authHeader()});
    }
}

export default new RoleService();