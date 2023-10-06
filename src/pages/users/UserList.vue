<template>

  <Breadcrumbs main="Usuários" title="Lista de Usuários" />

  <div class="container-fluid basic_table">

      <div class="card">
          <div class="card-body">
            
            <div class="row">
              <div class="col-md-12">
                <button
                  @click="add"
                  class="btn btn-primary float-end"
                  v-show="is_manager"
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
                    v-model="filters.name"
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
                  :items="users"
                  :loading="ctrl.loading"
                  item-value="name"
                  class="mt-2"
                  :server-items-length="ctrl.totalItems"
                  :footer-props="{
                    'items-per-page-options': [5, 10, 15]
                  }"
                >
                
                <template v-slot:[`item.actions`]="{ item }">

                  <a href="#" @click.prevent="edit(item.id)" class="p-1" v-show="is_manager">
                    <span class="action-box large delete-btn"
                        title="Editar"><i class="icon"><i class="icon-pencil"></i></i>
                    </span>
                  </a>

                  <a href="#" @click.prevent="openRemoveDialog(item);" v-show="is_manager">
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
      :obj_title="user.first_name"
      @remove-object-context="remove"
      @close-dialog="closeDialog"
  ></RemoveDialog>

</template>

<script>
import UserService from "@/services/UserService";
import RemoveDialog from "@/components/RemoveDialog.vue";
export default {

  components:{
      RemoveDialog,
  },

  async mounted() {
    const users = await this.userService.getUsers();
    this.users = users.data.results;
    this.ctrl.totalItems = users.data.count;

    if(userData.is_manager){
      this.is_manager = true;
    }
  },

  methods: {

    async search() {

      const { sortBy, sortDesc, page, itemsPerPage } = this.ctrl.options
      const filterData = {
        page: page,
        page_size: itemsPerPage,
        //ordering: `${sortDesc[0] ? '-' : ''}${sortBy}`,
        name: this.filters.name,
      }
      const users = await this.userService.getUsers(filterData);
      this.users = users.data.results;
      this.ctrl.totalItems = users.data.count;
    },

    async clearSearch() {
      this.filters = {
        first_name: '',
        email: '',
      }

      const users = await this.userService.getUsers({});
      this.users = users.data.results;
      this.ctrl.totalItems = users.data.count;
    },

    add() {
      this.$router.push({ name: "users:add" });
    },

    edit(id) {
      this.$router.push({ name: "users:edit", params: { id: id } });
    },

    async remove(){

        const result = await this.userService.delete(this.category.id);
        if(result.status != 'success'){
            this.ctrl.dialog = false;
            this.$toast.error(`Erro ao remover o Usuário`, {position: 'top-right' });
            return;
        }
  
        this.users = this.users.filter(e=> e.id != this.category.id);
        this.ctrl.dialog = false;
        this.$toast.success('Usuário removido com sucesso!',  {position: 'top-right' });
    },

    openRemoveDialog(category){
      this.category = {};
      this.category = category;
      this.ctrl.dialog = true;
    },

    closeDialog(){
        this.ctrl.dialog = false;
    },

    async submit() {
      this.users = [];

      const response = await this.userService.addClient(this.category);
      const data = response.data;

      if (response.status != "success") {
        for (const property in data) {
          this.$toast.error(`${property}: ${data[property]}`, {
            position: "top-right",
          });
        }
        return;
      }
      this.$router.push({ name: "users:edit", params: { id: data.id } });
    },
  },

  data() {
    return {
      is_manager: false,
      user: {},
      userService: new UserService(),
      ctrl: {
        options: {},
        totalItems: 0,
        dialog: false,
        loading: false,
      },
      itemsPerPage: 15,
      headers: [
        {
          title: "Nome",
          align: "start",
          sortable: false,
          key: "full_name",
        },
        {
          title: "Perfil",
          align: "start",
          sortable: false,
          key: "profile_name",
        },
        { title: "Ações", align: "center", key: "actions", sortable: false, }
      ],
      users: [],
      defaultRules: [(val) => (val || "").length > 0 || "Campo obrigatório"],
      filters: {
        first_name: "",
      },
    };
  },
};
</script>