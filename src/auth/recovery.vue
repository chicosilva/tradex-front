<template>
  <div>

    <div class="container-fluid">
      <div class="row ">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img class="img-fluid for-light" src="../assets/images/logo/logo.png" alt="looginpage" width="250" />
                </a>
              </div>
              <div class="login-main">
                <form class="theme-form">
                  <h4>Recuperar senha</h4>

                  <div class="form-group">
                    <label class="col-form-label">Informe seu e-mail</label>
                    <input class="form-control" type="email" required=""
                      v-model="user.email.value">
                    <span class="validate-error" v-if="!user.email.value || !validEmail(user.email.value)">{{
                      user.email.errormsg }}</span>

                  </div>

                  <div class="form-group mb-0">
                   
                    <div class="text-end mt-3">
                      <button class="btn btn-primary btn-block w-100" type="submit" @click.prevent="recover_password">Enviar</button>
                      
                      <div class="alert alert-danger mt-3" v-show="error_login">e-mail inválido</div>
                      <div class="alert alert-success mt-3" v-show="success_login">Instruções para gerar uma nova senha enviados para seu e-mail</div>

                      <v-progress-circular
                          v-if="loading"
                          indeterminate
                          color="primary"
                      ></v-progress-circular>
                    </div>
                  </div>
                  
                  
                  <p class="mt-4 mb-0 text-center">Já tem conta?<a class="ms-2" href="/auth/login">Login</a></p>

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

  created() {

  },

  methods: {

    async recover_password() {
      this.error_login = false;

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

      const result = await service.recoveryPassword(this.user.email.value);

      this.loading = false;
      if(result.status != 'success'){
        this.error_login = true;
        return;
      }

      this.success_login = true;
      
    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },
};
</script>
