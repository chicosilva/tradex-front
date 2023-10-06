import httpsAllowAny from './httpsAllowAny';
import Http from './https';

export default class AuthService {

  async doLogin(user) {
    return await httpsAllowAny.post(`/api/token/`, user);
  }

  async saveUser(user) {
    return await httpsAllowAny.post('/register/', user);
  }

  async recoveryPassword(email) {
    return await httpsAllowAny.post(`/register/recovery/`, {email});
  }

  async resetPassword(data) {
    return await httpsAllowAny.post(`/register/reset/`, data);
  }

  async confirmEmail(uuid) {
    return await httpsAllowAny.post(`/register/${uuid}/confirm/`);
  }

}