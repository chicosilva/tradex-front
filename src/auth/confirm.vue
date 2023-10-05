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
                  <h4>Confirmação de e-mail</h4>

                  <div class="form-group">
                    <div class="alert alert-success mt-3" v-show="success_validation">
                      e-mail confirmado com sucesso!
                    </div>
                    <div class="alert alert-danger mt-3" v-show="!success_validation">
                      Ocorreu um erro ao validar seu e-mail.
                    </div>

                  </div>

                  <p class="mt-4 mb-0 text-center"><a class="ms-2" href="/auth/login">Login</a></p>

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
  name: 'confirm',
  data() {
    return {
      success_validation: false
    };
  },
  async mounted() {

      const authService = new AuthService();
      const result = await authService.confirmEmail(this.$route.params.id);

      if(result.status == 'success'){
        this.success_validation = true;
        this.$toast.success('e-mail validado com sucesso!',  {position: 'top-right' });
        return;
      }

      this.$toast.error('Ocorreu um erro ao validar seu e-mail',  {position: 'top-right' });

    },
  methods: {
  },
};
</script>
