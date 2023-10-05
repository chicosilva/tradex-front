<template>
    <Breadcrumbs main="Categorias" title="Cadastro de Usuário" />
    
    <div class="card">
        <div class="card-body">

            <form @submit.prevent="submit">
                <div class="row">

                    <div class="col-md-4 mb-3">
                        <v-text-field
                            v-model="user.first_name"
                            label="Nome"
                            :counter="30"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            :rules="defaultRules"
                        ></v-text-field>
                    </div>

                    <div class="col-md-4 mb-3">
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


                    <div class="col-md-4 mb-3">
                        <v-text-field
                            v-model="user.email"
                            label="e-mail"
                            :counter="150"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            type="email"
                            :rules="defaultRules"
                        ></v-text-field>
                    </div>

                    <div class="col-md-4 mb-3">
                        <v-select
                            v-model="user.profile"
                            variant="outlined"
                            required
                            :items="profiles"
                            item-title="name"
                            item-value="id"
                            label="Perfil"
                            :rules="[v => !!v || 'Campo obrigatório']"
                            density="compact"
                            hint="Usado para controle interno"
                            persistent-hint
                        ></v-select>
                    </div>

                    <div class="col-md-4 mb-3">
                        <v-text-field
                            v-model="user.whatsapp"
                            label="Whatsapp"
                            :counter="150"
                            filled
                            variant="outlined"
                            density="compact"
                            required
                            type="tel"
                            :rules="defaultRules"
                        ></v-text-field>
                    </div>
                </div>

                <button type="submit" class="btn btn-light" :disabled="ctrl.loading">Salvar</button>

                <v-progress-circular
                    v-if="ctrl.loading"
                    indeterminate
                    color="primary"
                ></v-progress-circular>
    
            </form>
            
        </div>
    </div>

</template>

<script>

import UserService from "@/services/UserService";


export default {

    async mounted() {
        
        if(this.$route.params.id !== undefined){
            const user = await this.userService.getUserById(this.$route.params.id);
            this.user = user.data;
        }

        const profileService = new ProfileService();

        const profiles = await profileService.getProfiles();
        this.profiles = profiles.data.results;

    },

    methods: {
        async submit(){

            let response = null;
            if(this.$route.params.id !== undefined){
                response = await this.userService.update(this.user);
            }else{
                response = await this.userService.create(this.user);
            }

            if(response.status != 'success'){

                const data = response.data;
                for (const property in data) {

                    this.$toast.error(`${property}: ${data[property]}`, {
                        position: "top-right",
                    });

                }
                return;
            }

            if(this.$route.params.id !== undefined){
                this.$toast.success('Usuário editado com sucesso!',  {position: 'top-right' });
            }else{
                this.$toast.success('Usuário adicionado com sucesso!',  {position: 'top-right' });
            }

            this.$router.push({ name: "users:list" });
        },
    },

    data() {
        return {
            profiles: [],
            defaultRules: [(val) => (val || "").length > 0 || "Campo obrigatório"],
            user: {},
            userService: new UserService(),
            ctrl:{
                loading: false,
            }
        }
    },
}
</script>