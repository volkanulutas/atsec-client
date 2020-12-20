import axios from 'axios';

import { API_BASE_URL, API_URL_DONOR} from '../constants';

class DonorService {

    getAllDonors()
    {
       return axios.get(API_BASE_URL + API_URL_DONOR);
    }

    getDonorById(id) {
        return axios.get(API_BASE_URL + API_URL_DONOR + id);
    }

    createDonor(donor){
        console.log('create: donor: ' + JSON.stringify(donor));
        return axios.post(API_BASE_URL + API_URL_DONOR, donor);
    }

    updateDonor(id, donor) {
        console.log('update: id: ' + id + ' donor: ' + JSON.stringify(donor));
        return axios.put(API_BASE_URL + API_URL_DONOR + id, donor);
    }

    deleteDonor(id)
    {
        console.log('delete donor: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_DONOR + id);
    }
}

export default new DonorService();