import Http from './https';

export default class UserService {

    async getUsers(extraParams = {}) {
      const params = {...extraParams };
  
      const { data, status, text } = await Http.get(`/company-users/`, {params});
      return { data, status, text };
    }

    async getUserById(id) {
      const { data, status, text } = await Http.get(`/company-users/${id}/`);
      return { data, status, text };
    }
  
    async create(user) {
      return await Http.post('/company-users/',  {...user});
    }

    async update(user) {
      return await Http.patch(`/company-users/${user.id}/`, user);
    }

    async delete(user_id) {
      return await Http.delete(`/company-users/${user_id}`);
    }

    async getUserData() {
      const userData = JSON.parse(localStorage.getItem('User'));
      const { data, status, text } = await Http.get(`/company-users/${userData.user_id}/detail-user/`);
      return { data, status, text };
    }

}