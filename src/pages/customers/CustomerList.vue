<template>

  <Breadcrumbs main="Clientes" title="Meus Clientes" />

  <div class="container-fluid basic_table">

      <div class="card">
          <div class="card-body">
            
            <div class="row">
              <div class="col-md-12">
                <button
                  @click="add"
                  class="btn btn-primary float-end"
                >
                <i class="icofont icofont icofont-plus"> </i>
                  Adicionar
                </button>
              </div>

              <div class="col-md-12 mb-5">
                <hr class="hr" />
              </div>
              
            </div>

            <div class="row">

              <div class="col-md-3">
                <v-text-field
                    v-model="filters.fantasy_name"
                    label="Nome"
                    :counter="150"
                    filled
                    density="compact"
                    variant="outlined"
                    dense
                    required
                    @keyup.enter="search"
                ></v-text-field>
              </div>
  
              <div class="col-md-3">
                <v-text-field
                    type="email"
                    v-model="filters.email"
                    label="E-mail"
                    :counter="150"
                    filled
                    density="compact"
                    variant="outlined"
                    dense
                    required
                    @keyup.enter="search"
                ></v-text-field>
              </div>

              <div class="col-md-3 mb-3">
                  <button type="button" :disabled="ctrl.loading" class="btn btn-light ml-3 float-end" @click="search">
                    <i class="icofont icofont-ui-search"> </i> Buscar
                  </button>

                  <button type="button" :disabled="ctrl.loading" class="btn btn-light float-end" @click="clearSearch">
                    <i class="icofont icofont icofont-eraser"> </i> Limpar
                  </button>
                  
              </div>

            </div>

            <div class="row">
              
              <div class="col-md-12 mb-5">
                <hr class="hr" />
              </div>

              <div class="col-md-12">
                Nenhum registro foi encontrado.
              </div>

              <div class="col-md-12">
                <v-data-table
                  v-model:items-per-page="itemsPerPage"
                  v-bind:options="ctrl.options"
                  :headers="headers"
                  :items="customers"
                  :loading="ctrl.loading"
                  item-value="fantasy_name"
                  class="mt-2"
                  :server-items-length="ctrl.totalItems"
                  :footer-props="{
                    'items-per-page-options': [5, 10, 15]
                  }"
                >
                
                <template v-slot:[`item.actions`]="{ item }">

                  <a href="#" @click.prevent="edit(item.id)" class="p-1">
                    <span class="action-box large delete-btn"
                        title="Editar"><i class="icon"><i class="icon-pencil"></i></i>
                    </span>
                  </a>

                  <a href="#" @click.prevent="openRemoveDialog(item);">
                      <span class="action-box large delete-btn"
                          title="Remover"><i class="icon"><i class="icon-trash"></i></i>
                      </span>
                  </a>

                </template>
              
              </v-data-table>
              </div>
            </div>

          </div>
      </div>
  </div>

  <RemoveDialog
      v-model="ctrl.dialog"
      :obj_title="customer.fantasy_name"
      @remove-object-context="removeCustomer"
      @close-dialog="closeDialog"
  ></RemoveDialog>

</template>

<script>
import CustomerService from "@/services/CustomerService";
import RemoveDialog from "@/components/RemoveDialog.vue";
export default {

  components:{
      RemoveDialog,
  },

  async mounted() {
    const customers = await this.customerService.getCustomers();
    this.customers = customers.data.results;
    this.ctrl.totalItems = customers.data.count;

  },

  methods: {

    async search() {

      const { sortBy, sortDesc, page, itemsPerPage } = this.ctrl.options
      const filterData = {
        page: page,
        page_size: itemsPerPage,
        //ordering: `${sortDesc[0] ? '-' : ''}${sortBy}`,
        fantasy_name: this.filters.fantasy_name,
        name: this.filters.name,
        email: this.filters.email,
      }
      const customer = await this.customerService.getCustomers(filterData);
      this.customers = customer.data.results;
      this.ctrl.totalItems = customer.data.count;
    },

    async clearSearch() {
      this.filters = {
        fantasy_name: '',
        email: '',
      }
      const customer = await this.customerService.getCustomers({});
      this.customers = customer.data.results;
      this.ctrl.totalItems = customer.data.count;
    },

    add() {
      this.$router.push({ name: "customers:add" });
    },

    edit(id) {
      this.$router.push({ name: "customers:edit", params: { id: id } });
    },

    async removeCustomer(){

        const result = await this.customerService.delete(this.customer.id);
        if(result.status != 'success'){
            this.ctrl.dialog = false;
            this.$toast.error(`Erro ao remover o Cliente`, {position: 'top-right' });
            return;
        }
        this.customers = this.customers.filter(e=> e.id != this.customer.id);
        this.ctrl.dialog = false;
        this.$toast.success('Cliente removido com sucesso!',  {position: 'top-right' });
    },

    openRemoveDialog(customer){
      this.customer = {};
      this.customer = customer;
      this.ctrl.dialog = true;
    },

    closeDialog(){
        this.ctrl.dialog = false;
    },

    async submit() {
      this.customers = [];
      const response = await this.customerService.addClient(this.customer);
      const data = response.data;

      if (response.status != "success") {
        for (const property in data) {
          this.$toast.error(`${property}: ${data[property]}`, {
            position: "top-right",
          });
        }
        return;
      }
      this.ctrl.open_add_customer = false;
      this.$router.push({ name: "customers:edit", params: { id: data.id } });
    },
  },

  data() {
    return {
      customer: {},
      customerService: new CustomerService(),
      ctrl: {
        options: {},
        totalItems: 0,
        dialog: false,
        loading: false,
        open_add_customer: false,
      },
      itemsPerPage: 15,
      headers: [
        {
          title: "Nome",
          align: "start",
          sortable: false,
          key: "fantasy_name",
        },
        { title: "Responsável", align: "start", key: "first_name" },
        { title: "email", align: "start", key: "email" },
        { title: "Whatsapp", align: "start", key: "whatsapp" },
        { title: "CNPJ", align: "start", key: "document" },
        { title: "Ações", align: "center", key: "actions", sortable: false, }
      ],
      customers: [],
      defaultRules: [(val) => (val || "").length > 0 || "Campo obrigatório"],
      filters: {
        fantasy_name: "",
        email: "",
      },
    };
  },
};
</script>