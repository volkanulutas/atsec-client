import axios from 'axios';

import { API_BASE_URL, API_URL_CUSTOMER} from '../constants';

class CustomerService {

    getAllCustomers()
    {
       return axios.get(API_BASE_URL + API_URL_CUSTOMER);
    }

    getCustomerById(id) {
        return axios.get(API_BASE_URL + API_URL_CUSTOMER + id);
    }

    createCustomer(customer){
        console.log('create: customer: ' + JSON.stringify(customer));
        return axios.post(API_BASE_URL + API_URL_CUSTOMER, customer);
    }

    updateCustomer(id, customer) {
        console.log('update: id: ' + id + ' customer: ' + JSON.stringify(customer));
        return axios.put(API_BASE_URL + API_URL_CUSTOMER + id, customer);
    }

    deleteCustomer(id)
    {
        console.log('delete customer: id: ' + id);
        return axios.delete(API_BASE_URL + API_URL_CUSTOMER + id);
    }
}

export default new CustomerService();