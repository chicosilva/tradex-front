<template>

  <Breadcrumbs main="Produtos" title="Meus Produtos" />

  <div class="container-fluid basic_table">
 
      <div class="card">

          <div class="card-body">
            
            <div class="row">
              <div class="col-md-12">
                <button
                  @click="this.ctrl.open_add_document = true"
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
                    v-model="filters.title"
                    label="Nome do arquivo"
                    :counter="150"
                    filled
                    density="compact"
                    variant="outlined"
                    dense
                    required
                    @keyup.enter="searchDocuments"
                ></v-text-field>
              </div>
              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-6">
                    <VueDatePicker placeholder="Data início" v-model="filters.start_date" auto-apply locale="pt-BR" :format="format" :enable-time-picker="false"></VueDatePicker>
                  </div>
                  <div class="col-md-6">
                    <VueDatePicker placeholder="Data fim" v-model="filters.end_date" auto-apply locale="pt-BR" :format="format_end_date" :enable-time-picker="false"></VueDatePicker>
                  </div>
                </div>
              </div>
 
            </div>

            <div class="row">
                <div class="col-md-12">
                    <button type="button" :disabled="ctrl.loading" class="btn btn-light ml-3 float-end" @click="searchDocuments">
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
              <div class="col-md-12" >
                <v-data-table
                  v-model:items-per-page="itemsPerPage"
                  v-bind:options="ctrl.options"
                  :headers="headers"
                  :items="documents"
                  :loading="ctrl.loading"
                  item-value="title"
                  class="mt-2"
                  :server-items-length="ctrl.totalItems"
                  :footer-props="{
                    'items-per-page-options': [5, 10, 15]
                  }"
                >
                
                <template v-slot:[`item.actions`]="{ item }">

                  <a href="#" @click.prevent="edit(item.id)" class="p-1">
                    <span class="action-box large delete-btn"
                        title="Editar arquivo"><i class="icon"><i class="icon-pencil"></i></i>
                    </span>
                  </a>

                  <a href="#" @click.prevent="openRemoveDialog(item);">
                      <span class="action-box large delete-btn"
                          title="Remover arquivo"><i class="icon"><i class="icon-trash"></i></i>
                      </span>
                  </a>

                </template>
              
              </v-data-table>
              </div>
            </div>

          </div>
      </div>
  </div>

  <v-dialog v-model="ctrl.open_add_document" width="450">
    <form @submit.prevent="submit">
      <v-card>
        <v-card-title class="text-h5"> Adicionar Produto </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col-md-12 mb-3">
              <v-text-field
                v-model="document.name"
                label="Nome"
                :counter="150"
                filled
                variant="outlined"
                dense
                required
                :rules="defaultRules"
              ></v-text-field>
            </div>


            <div class="col-md-12 mb-3">
              <v-text-field
                v-model="document.ean"
                label="EAN"
                :counter="150"
                filled
                variant="outlined"
                dense
                required
                :rules="defaultRules"
              ></v-text-field>
            </div>


            <div class="col-md-12 mb-3">
              <v-text-field
                v-model="document.min_price"
                label="Valor mínimo"
                :counter="150"
                filled
                variant="outlined"
                dense
                required
                :rules="defaultRules"
              ></v-text-field>
            </div>


            <div class="col-md-12 mb-3">
              <v-text-field
                v-model="document.max_price"
                label="Valor Máximo"
                :counter="150"
                filled
                variant="outlined"
                dense
                required
                :rules="defaultRules"
              ></v-text-field>
            </div>

            
          </div>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click.prevent="ctrl.open_add_document = false"
          >
            Cancelar
          </v-btn>
          <button
            type="submit"
            class="btn btn-success"
            :disabled="ctrl.loading"
          >
            Continuar
          </button>
          <v-progress-circular
            v-if="ctrl.loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>

  <RemoveDialog
      v-model="ctrl.dialog"
      :obj_title="document.title"
      @remove-object-context="deleteDocument"
      @close-dialog="closeDialog"
  ></RemoveDialog>

</template>


<script>
import ProductService from "@/services/ProductService";
import RemoveDialog from "@/components/RemoveDialog.vue";
import utilsService from "@/shared/utilsService";
import DatePickerList from "@/components/DatePickerList.vue";


export default {

  components:{
      RemoveDialog,
      DatePickerList,
  },
  //mixins: [processErrorMessage],
  async mounted() {
    const document = await this.productService.getAllDocuments({});
    this.documents = document.data.results;

  },

  methods: {

    format(date){

      this.filters.start_date_en = utilsService.formatDate(date);
      return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    },

    format_end_date(date){
      this.filters.end_date_en = utilsService.formatDate(date);
      return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    },

    async searchDocuments() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.ctrl.options;

      const filterData = {
        page: page,
        page_size: itemsPerPage,
        //ordering: `${sortDesc[0] ? '-' : ''}${sortBy}`,
        title: this.filters.title,
        customer: this.filters.customer,
        category: this.filters.category,
        start_date: this.filters.start_date_en,
        end_date: this.filters.end_date_en,
      }
      const document = await this.productService.getAllDocuments(filterData);

      this.documents = document.data.results;
      this.ctrl.totalItems = document.data.count;
    },

    async clearSearch() {
      this.filters = {
        title: '',
        customer: '',
        category: '',
        start_date: '',
        start_date_en: '',
        end_date: '',
        end_date_en: '',
      }

      const document = await this.productService.getAllDocuments({});
 
      this.documents = document.data.results;

    },

    edit(id) {
      this.$router.push({ name: "documents:edit", params: { id: id } });
    },

    async deleteDocument(){
        const result = await this.productService.delete(this.document.id);
        if(result.status != 'success'){
            this.ctrl.dialog = false;
            this.$toast.error(`Erro ao remover o documento`, {position: 'top-right' });
            return;
        }
        this.documents = this.documents.filter(e=> e.id != this.document.id);
        this.ctrl.dialog = false;
        this.$toast.success('Documento removido com sucesso!',  {position: 'top-right' });
    },

    openRemoveDialog(document){
      this.document = {};
      this.document = document;
      this.ctrl.dialog = true;
    },

    closeDialog(){
        this.ctrl.dialog = false;
    },

    async submit() {
      this.documents = [];
      const response = await this.productService.addProduct(this.document);
      const data = response.data;

      if (response.status != "success") {
        for (const property in data) {
          this.$toast.error(`${property}: ${data[property]}`, {
            position: "top-right",
          });
        }
        return;
      }
      this.ctrl.open_add_document = false;
      this.$router.push({ name: "documents:edit", params: { id: data.id } });
    },
  },

  data() {
    return {
      document: {},
      productService: new ProductService(),
      ctrl: {
        options: {},
        totalItems: 0,
        dialog: false,
        loading: false,
        open_add_document: false,
      },
      itemsPerPage: 15,
      headers: [
        {
          title: "Nome",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "EAN", align: "start", key: "ean" },
        { title: "min_price", align: "start", key: "min_price" },
        { title: "max_price", align: "start", key: "max_price" },
        { title: "Ações", align: "center", key: "actions", sortable: false, }
      ],
      documents: [],
      defaultRules: [(val) => (val || "").length > 0 || "Campo obrigatório"],
      filters: {
        title: "",
        category: "",
        customer: "",
        status: "",
        start_date: "",
        end_date: "",
        start_date_en: "",
        end_date: "",
      },
    };
  },
};
</script>