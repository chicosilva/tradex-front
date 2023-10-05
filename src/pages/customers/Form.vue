<template>
    <Breadcrumbs main="Clientes" title="Cadastro de Cliente" />
    
    <div class="card">
        <div class="card-body">

            <form @submit.prevent="submit">
                <div class="row">

                    <div class="col-md-4 mb-3">
                        <v-text-field
                            v-model="customer.fantasy_name"
                            label="Nome Fantasia"
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
                            v-model="customer.first_name"
                            label="Primeiro nome Responsável"
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
                            v-model="customer.last_name"
                            label="Sobrenome nome Responsável"
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
                            v-model="customer.document"
                            label="CPF/CNPJ"
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
                            v-model="customer.email"
                            label="email"
                            :counter="150"
                            filled
                            variant="outlined"
                            density="compact"
                            required
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

import CustomerService from "@/services/CustomerService";
import SharedService from "@/services/SharedService";

export default {

    async mounted() {
        
        if(this.$route.params.id !== undefined){
            const customer = await this.customerService.getCustomerById(this.$route.params.id);
            this.customer = customer.data;
        }

    },

    methods: {
        async submit(){

            let response = null;
            if(this.$route.params.id !== undefined){
                response = await this.customerService.update(this.customer);
            }else{
                response = await this.customerService.create(this.customer);
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
                this.$toast.success('Cliente editado com sucesso!',  {position: 'top-right' });
            }else{
                this.$toast.success('Cliente adicionado com sucesso!',  {position: 'top-right' });
            }

            this.$router.push({ name: "customers:list" });
        },
    },

    data() {
        return {

            defaultRules: [(val) => (val || "").length > 0 || "Campo obrigatório"],
            customer: {},
            customerService: new CustomerService(),
            sharedService: new SharedService(),
            ctrl:{
                loading: false,
            }
        }
    },
}
</script>