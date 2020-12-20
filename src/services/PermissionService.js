import axios from 'axios';

import { API_BASE_URL, API_URL_PERMISSION} from '../constants';

class PermissionService {

    getAllPermissions()
    {
       return axios.get(API_BASE_URL + API_URL_PERMISSION);
    }
    
    getPermissionById(id) {
        return axios.get(API_BASE_URL + API_URL_PERMISSION + id);
    }

    createPermission(permission){
        console.log('create: permission: ' + JSON.stringify(permission));
        return axios.post(API_BASE_URL + API_URL_PERMISSION, permission);
    }

    updatePermission(id, permission) {
        console.log('update: id: ' + id + ' permission: ' + JSON.stringify(permission));
        return axios.put(API_BASE_URL + API_URL_PERMISSION + id, permission);
    }

    deletePermission(id)
    {
        console.log('delete permission: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_PERMISSION + id);
    }
}

export default new PermissionService();