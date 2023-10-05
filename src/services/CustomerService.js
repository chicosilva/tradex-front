import Http, { renewToken } from './https';

export default class CustomerService {

    async getCustomers(extraParams = {}) {
      const params = {...extraParams };
  
      const { data, status, text } = await Http.get(`/customers/`, {params});
      return { data, status, text };
    }

    async getCustomerById(id) {
      const { data, status, text } = await Http.get(`/customers/${id}/`);
      return { data, status, text };
    }
  
    async create(customer) {
      return await Http.post('/customers/',  {...customer});
    }

    async update(customer) {
      return await Http.patch(`/customers/${customer.id}/`, customer);
    }
  
    async delete(customer_id) {
      return await Http.delete(`/customers/${customer_id}`);
    }

}