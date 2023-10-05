<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                    class="img-fluid for-light"
                    src="../assets/images/logo/logo.png"
                    alt="looginpage"
                    width="250"
                  />
                  <img
                    class="img-fluid for-dark"
                    src="../assets/images/logo/logo_dark.png"
                    alt="looginpage"
                  />
                </a>
              </div>
              
              <div class="login-main">
                <form @submit.prevent="submit">
                  <h4>Criar Conta</h4>
                  <p>Entre com os detalhes da sua empresa</p>
                  <div class="form-group">
                    <label class="col-form-label pt-0">Seu nome</label>
                    <div class="row g-2">
                      <div class="col-6">
                        
                        <v-text-field
                            v-model="user.first_name"
                            label="Nome"
                            :counter="15"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                        ></v-text-field>

                      </div>
                      <div class="col-6">
                        <v-text-field
                            v-model="user.last_name"
                            label="Sobrenome"
                            :counter="150"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <v-text-field
                            v-model="user.fantasy_name"
                            type="text"
                            label="Nome Fantasia"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                    ></v-text-field>
                  </div>

                  <div class="form-group">
                    <v-text-field
                            v-model="user.email"
                            type="email"
                            label="e-mail"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                    ></v-text-field>
                  </div>
                  <div class="form-group">
                    <v-text-field
                            v-model="user.password"
                            type="password"
                            label="Senha"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                    ></v-text-field>
                  </div>
                  <div class="form-group">
                    <v-text-field
                          v-model="user.password2"
                          type="password"
                          label="Confirme a Senha"
                          filled
                          variant="outlined"
                          density="compact"
                          required
                          :rules="defaultRules"
                    ></v-text-field>
                  </div>

                  <div class="form-group">
                    <v-text-field
                            v-model="user.document"
                            label="CNPJ"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                      ></v-text-field>
                  </div>

                  <div class="form-group">

                    <v-text-field
                            v-model="user.whatsapp"
                            label="Whatsapp"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                      ></v-text-field>
                  </div>


                  <div class="form-group mb-0">
                    <div class="checkbox p-0" style="display: none;">
                     <!-- <input id="checkbox1" type="checkbox" /> -->
                      <label class="text-muted" for="checkbox1"
                        >Aceito os <a class="ms-2" href="#"
                          >Termos de uso</a
                        ></label
                      >
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                      Criar Conta
                    </button>

                    <v-progress-circular
                        v-if="loading"
                        indeterminate
                        color="primary"
                    ></v-progress-circular>

                    <div class="alert alert-danger mt-3" v-if="show_errors">
                      <span v-html="error_form"></span>
                    </div>

                  </div>
                  
                  
                  <p class="mt-4 mb-0">
                    Já tem conta?
                    <router-link class="ms-2" to="/auth/login">
                      Login
                    </router-link>
                  </p>
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
    name: 'register-company',
    data(){
        return{
            show_errors: false,
            error_form: "",
            loading: false,
            defaultRules: [(val) => (val || "").length > 0 || "Campo obrigatório"],
            active: true,
            user: {}
        }
    },
    methods:{
        show(){
            this.active=!this.active
        },
        async submit(){

            this.error_form = "";

            this.show_errors = false;
            const service = new AuthService(); 
            this.loading = true;
            const result = await service.saveUser(this.user);
            const data = result.data;

            this.loading = false;

            if(result.statusCode != 201){
              this.show_errors = true;
              for (const property in data) {
                this.error_form += `<strong>${property}: </strong> ${data[property]} <br> <br>`;
              }
              return;
            }

            this.loading = false;
            this.$toast.success('Cadastro efetuado com sucesso!',  {position: 'top-right' });
            this.$router.push('/auth/login/');
        },
    }
}
</script>
