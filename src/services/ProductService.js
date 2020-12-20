import axios from 'axios';

import { API_BASE_URL, API_URL_PRODUCT} from '../constants';

class ProductService {

    getAllProducts(){
       return axios.get(API_BASE_URL + API_URL_PRODUCT);
    }

    getProductById(id) {
        return axios.get(API_BASE_URL + API_URL_PRODUCT + id);
    }

    createProduct(product){
        console.log('create: product: ' + JSON.stringify(product));
        return axios.post(API_BASE_URL + API_URL_PRODUCT, product);
    }

    updateProduct(id, product) {
        console.log('update: id: ' + id + ' product: ' + JSON.stringify(product));
        return axios.put(API_BASE_URL + API_URL_PRODUCT + id, product);
    }

    deleteProduct(id){
        console.log('delete product: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_PRODUCT + id);
    }
}

export default new ProductService();