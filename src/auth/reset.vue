<template>
    <div>
        <div class="page-wrapper">
            <div class="container-fluid p-0">
                <div class="row">
                    <div class="col-12">
                        <div class="login-card">
                            <div>
                                <div>
                                    <a class="logo">
                                        <img class="img-fluid" src="../assets/images/logo/logo.png" alt="looginpage" width="250" />
                                    </a>
                                </div>
                                <div class="login-main ">
                                    <form class="theme-form" @submit.prevent="">
                                        <h4>Criar nova senha</h4>
                                        <div class="form-group">
                                            <label class="col-form-label">Nova Senha</label>
                                            <div class="form-input position-relative">

                                                <input class="form-control" v-model="user.password" type="password" required placeholder="*********" />

                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Repita a Senha</label>
                                            <input class="form-control" type="password" v-model="user.password2" required
                                                placeholder="*********">
                                        </div>

                                        <div class="form-group mb-0">

                                            <div class="text-end mt-3">
                                                <button class="btn btn-primary btn-block w-100" type="submit"
                                                    @click.prevent="resetPassword">Atualizar</button>

                                                <div class="alert alert-danger mt-3" v-show="error_login">Credenciais
                                                    inválidas</div>
                                                <div class="alert alert-success mt-3" v-show="success_login">Aguarde,
                                                    redirecionando...</div>
                                                <div class="alert alert-danger mt-3" v-if="show_errors">
                                                  <span v-html="error_form"></span>
                                                </div>
                                                <v-progress-circular v-if="loading" indeterminate
                                                    color="primary"></v-progress-circular>
                                            </div>
                                        </div>
                                    </form>
                                </div>
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
            error_form: '',
            loading: false,
            error_login: false,
            success_login: false,
            result: { email: '', password: '' },

            user: {}
        };
    },
    methods: {

        async resetPassword() {
            this.error_login = false;

            this.loading = true;
            const service = new AuthService();
            const tcode = this.$route.query.tcode

            const data_user = {
                  password: this.user.password,
                  password2: this.user.password2,
                  code: tcode
                }

            const result = await service.resetPassword(
                data_user
            )
            const data = result.data;
            this.loading = false;
            

            if(result.statusCode != 200){
              this.show_errors = true;
              for (const property in data) {
                this.error_form += `<strong>${property}: </strong> ${data[property]} <br> <br>`;
              }
              return;
            }

            this.success_login = true;
            this.logging = false
            this.$router.push('/auth/login')

        },
       
    },
};
</script>
    
    