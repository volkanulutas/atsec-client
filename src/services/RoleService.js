import axios from 'axios';

import { API_BASE_URL, API_URL_ROLE} from '../constants';

class RoleService {

    getAllRoles(){
       return axios.get(API_BASE_URL + API_URL_ROLE);
    }

    getRoleById(id) {
        return axios.get(API_BASE_URL + API_URL_ROLE + id);
    }

    createRole(role){
        return axios.post(API_BASE_URL + API_URL_ROLE, role);
    }

    updateRole(id, role) {
        return axios.put(API_BASE_URL + API_URL_ROLE + id, role);
    }

    deleteRole(id){
        return axios.delete(API_BASE_URL + API_URL_ROLE + id);
    }
}

export default new RoleService();