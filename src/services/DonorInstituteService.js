import axios from 'axios';

import { API_BASE_URL, API_URL_DONOR_INSTITUTE} from '../constants';

class DonorInstituteService {

    getAllDonorInstitutes(){
       return axios.get(API_BASE_URL + API_URL_DONOR_INSTITUTE);
    }

    getDonorInstituteById(id) {
        return axios.get(API_BASE_URL + API_URL_DONOR_INSTITUTE + id);
    }

    createDonorInstitute(product){
        console.log('create: rawProduct: ' + JSON.stringify(product));
        return axios.post(API_BASE_URL + API_URL_DONOR_INSTITUTE, product);
    }

    updateDonorInstitute(id, product) {
        console.log('update: id: ' + id + ' rawProduct: ' + JSON.stringify(product));
        return axios.put(API_BASE_URL + API_URL_DONOR_INSTITUTE + id, product);
    }

    deleteDonorInstitute(id){
        console.log('delete rawProduct: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_DONOR_INSTITUTE + id);
    }
}

export default new DonorInstituteService();