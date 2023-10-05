<template>
  <div>

    <div class="container-fluid">
      <div class="row ">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img class="img-fluid" src="../assets/images/logo/logo.png" alt="looginpage" width="250" />
                </a>
              </div>
              <div class="login-main">
                <form class="theme-form">
                  <h4>Faça a seu login: </h4>

                  <div class="form-group">
                    <label class="col-form-label">E-mail</label>
                    <input class="form-control" type="email" required=""
                      v-model="user.email.value">
                    <span class="validate-error" v-if="!user.email.value || !validEmail(user.email.value)">{{
                      user.email.errormsg }}</span>

                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Senha</label>
                    <div class="form-input position-relative">
                      <input class="form-control" type="password" name="login[password]" required=""
                        placeholder="*********" v-model="user.password.value">
                      <span class="validate-error" v-if="user.password.value.length < 7">{{ user.password.errormsg
                      }}</span>

                      
                    </div>
                  </div>
                  <div class="form-group mb-0">
                    <div class="checkbox p-0">
                    
                     
                    </div><a class="link" href="forget-password.html">Esqueci a asenha</a>
                    <div class="text-end mt-3">
                      <button class="btn btn-primary btn-block w-100" type="submit" @click.prevent="login">Entrar</button>
                      
                      <div class="alert alert-danger mt-3" v-show="error_login">Credenciais inválidas</div>
                      <div class="alert alert-success mt-3" v-show="success_login">Aguarde, redirecionando...</div>

                      <v-progress-circular
                          v-if="loading"
                          indeterminate
                          color="primary"
                      ></v-progress-circular>
                    </div>
                  </div>
                  
                  
                  <p class="mt-4 mb-0 text-center">Não tem conta?<a class="ms-2" href="/auth/add">Criar uma conta</a></p>
                  <p class="mt-4 mb-0 text-center">Primeiro acesso ou esqueceu a senha?<a class="ms-2" href="/auth/recovery">Recuperar senha</a></p>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import { parseJWT} from '@/services/auth';

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      error_login: false,
      success_login: false,
      result: { email: '', password: '' },

      user: {
        email: {
          value: '',
          errormsg: ''
        },
        password: {
          value: '',
          errormsg: ''
        }
      }
    };
  },

  methods: {

    async login() {

      this.error_login = false;
      if (!this.user.password.value) {
        this.user.password.errormsg = 'Informe a senha.'
      } else { this.user.password.errormsg = '' }

      if (!this.user.email.value) {
        this.user.email.errormsg = 'Informe o email.'
      } else if (!this.validEmail(this.user.email.value)) {
        this.user.email.errormsg = 'e-mail inválido.'
      }
      else {
        this.user.email.errormsg = ''
      }

      this.loading = true;
      const service = new AuthService();

      const result = await service.doLogin(
        { email: this.user.email.value,
          password: this.user.password.value
        }
      )

      this.loading = false;
      if(result.status != 'success'){
        this.error_login = true;
        return;
      }

      const dataUser = await parseJWT(result.data.access);

      this.success_login = true;
      localStorage.setItem('User', JSON.stringify({ email: this.user.email.value, useer: true, user_id: dataUser.user_id }));
      localStorage.setItem('docfacil', result.data.access);
      localStorage.setItem('docfacil-refresh', result.data.refresh);
      this.logging = false
      this.$router.push('/')

    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },
};
</script>
