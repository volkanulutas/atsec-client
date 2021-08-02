import axios from 'axios';

import { API_BASE_URL, API_URL_CUSTOMER} from '../constants';
import authHeader from "./AuthHeader"

class CustomerService {

    getAllCustomers()
    {
       return axios.get(API_BASE_URL + API_URL_CUSTOMER, {headers: authHeader()});
    }

    getCustomerById(id) {
        return axios.get(API_BASE_URL + API_URL_CUSTOMER + id, {headers: authHeader()});
    }

    createCustomer(customer){
        console.log('create: customer: ' + JSON.stringify(customer));
        return axios.post(API_BASE_URL + API_URL_CUSTOMER, customer, {headers: authHeader()});
    }

    updateCustomer(id, customer) {
        console.log('update: id: ' + id + ' customer: ' + JSON.stringify(customer));
        return axios.put(API_BASE_URL + API_URL_CUSTOMER + id, customer, {headers: authHeader()});
    }

    deleteCustomer(id){
        console.log('delete customer: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_CUSTOMER + id,{headers: authHeader()});
    }
}

export default new CustomerService();