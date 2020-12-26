import axios from 'axios';

import { API_BASE_URL, API_URL_RAWPRODUCT} from '../constants';

class RawProductService {

    getAllRawProducts(){
       return axios.get(API_BASE_URL + API_URL_RAWPRODUCT);
    }

    getRawProductById(id) {
        return axios.get(API_BASE_URL + API_URL_RAWPRODUCT + id);
    }

    createRawProduct(product){
        console.log('create: rawProduct: ' + JSON.stringify(product));
        return axios.post(API_BASE_URL + API_URL_RAWPRODUCT, product);
    }

    updateRawProduct(id, product) {
        console.log('update: id: ' + id + ' rawProduct: ' + JSON.stringify(product));
        return axios.put(API_BASE_URL + API_URL_RAWPRODUCT + id, product);
    }

    deleteRawProduct(id){
        console.log('delete rawProduct: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_RAWPRODUCT + id);
    }

    getAllProductLocations(){
        return axios.get(API_BASE_URL + API_URL_RAWPRODUCT + "location");
    }
}

export default new RawProductService();