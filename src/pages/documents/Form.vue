<template>
    <Breadcrumbs main="Produtos" :title="product.title" />
    
    <div class="card">
        <div class="card-body">

            <form @submit.prevent="submit">
                <div class="row">

                    <div class="col-md-5">
                        
                            <div class="row">

                                <div class="col-md-10 mb-3">
                                    <v-text-field
                                        v-model="product.name"
                                        label="Nome"
                                        :counter="150"
                                        filled
                                        variant="outlined"
                                        density="compact"
                                        required
                                        :rules="defaultRules"
                                    ></v-text-field>
                                </div>
                                

                                <div class="col-md-10 mb-3">
                                    <v-text-field
                                        v-model="product.ean"
                                        label="EAN"
                                        :counter="150"
                                        filled
                                        variant="outlined"
                                        density="compact"
                                        required
                                        :rules="defaultRules"
                                    ></v-text-field>
                                </div>

                                <div class="col-md-10 mb-3">
                                    <v-text-field
                                        v-model="product.min_price"
                                        label="Preço Mínimo"
                                        :counter="150"
                                        filled
                                        variant="outlined"
                                        density="compact"
                                        required
                                        :rules="defaultRules"
                                    ></v-text-field>
                                </div>

                                <div class="col-md-10 mb-3">
                                    <v-text-field
                                        v-model="product.max_price"
                                        label="Preço Máximo"
                                        :counter="150"
                                        filled
                                        variant="outlined"
                                        density="compact"
                                        required
                                        :rules="defaultRules"
                                    ></v-text-field>
                                </div>


                                <div class="col-md-12 mb-3">
                                <div class="row">

                                    <div class="col-md-6 mb-3">
                                        <v-file-input
                                                accept="image/*"
                                                v-model="files"
                                                color="primary"
                                                counter
                                                label="Selecionar imagem"
                                                placeholder="Selecione os imagem"
                                                prepend-icon="fa fa-paperclip"
                                                variant="outlined"
                                                :show-size="1000"
                                                class="pa-0"
                                                density="compact"
                                                
                                                @change="onFileChange"
                                            >
                                                <template v-slot:selection="{ fileNames }">
                                                    <template v-for="(fileName, index) in fileNames" :key="fileName">
                                                        <v-chip
                                                            v-if="index < 2"
                                                            color="primary"
                                                            label
                                                            size="small"
                                                            class="me-2"
                                                            >
                                                            {{ fileName }}
                                                        </v-chip>

                                                        <span
                                                            v-else-if="index === 2"
                                                            class="text-overline text-grey-darken-3 mx-2"
                                                            >
                                                            +{{ files.length - 2 }} Arquivo(s)
                                                        </span>
                                                    </template>
                                                </template>
                                        </v-file-input>
                                    </div>


                                    <div class="col-md-4 mb-3">
                                        <button type="button" :disabled="ctrl.loading" class="btn btn-light" @click="upload">
                                            <i class="fa fa-save"></i> Anexar imagem
                                        </button>
                                    </div>
                                    <div class="col-md-10 mb-3">
                                      
                                      <v-img
                                        :width="550"
                                        height="200"
                                        :src="product.image"
                                        ></v-img>
                                    </div>
                                    <div class="col-md-2 mb-3">
                                        <v-progress-circular
                                            v-if="ctrl.loading"
                                            indeterminate
                                            color="primary"
                                        ></v-progress-circular>
                                    </div>

                                </div>
                            </div>
                                
                                <div class="col-md-10 mb-3">
                                   

                                    <div class="row">
                                        <div class="col-md-6">
                                            <button type="submit" class="btn btn-light" :disabled="ctrl.loading">
                                                <i class="fa fa-save"></i> Salvar
                                            </button>
                                        </div>

                                    </div>
                                </div>
                              

                            </div>
                   
                    </div>
                    
                    <div class="col-md-7">

                        <div class="row">
                            <div class="col-md-12">
                                <button
                                @click="this.ctrl.open_add_product = true"
                                type="button"
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

                            <div class="col-md-12 mb-3">

                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr class="border-solid">
                                                <th scope="col">Data Início</th>
                                                <th scope="col">Data Fim</th>
                                                <th scope="col">Preço</th>
                                                <th scope="col" class="text-center">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr class="border-solid" v-for="item in product.pricevariations" :key="item.id">
                                                <td>{{item.start_date}}</td>
                                                <td>
                                                    {{item.end_date}}
                                                </td>
                                                <td> 
                                                    {{ item.price }}
                                                </td>
                                                <td class="text-center">
                                                    <a href="#" @click.prevent="openEditDialog(item)" class="p-1">
                                                        <span class="action-box large delete-btn"
                                                            title="Editar arquivo"><i class="icon"><i class="icon-pencil"></i></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" @click.prevent="openRemoveDialog(item);">
                                                        <span class="action-box large delete-btn"
                                                            title="Remover arquivo"><i class="icon"><i class="icon-trash"></i></i>
                                                        </span>
                                                    </a>
                                                   
                                                </td>
                                            </tr>
                                        
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="col-md-12 mb-3">
                                
                                <Bar v-show="product.pricevariations.length"
                                    id="my-chart-id"
                                    :options="chartOptions"
                                    :data="chartData"
                                />
                            </div>

                        </div>
                    </div>
                </div>

            </form>
            
        </div>
    </div>

    <RemoveDialog
        v-model="ctrl.dialog"
        :obj_title="pricevariation.image"
        @remove-object-context="deleteAttachment"
        @close-dialog="closeDialog"
    ></RemoveDialog>

    <v-dialog v-model="ctrl.open_add_product" width="450">
        <form @submit.prevent="submitPriceVariation">
            <v-card>
                <v-card-title class="text-h5"> Adicionar Preço </v-card-title>
                <v-card-text>
                <div class="row">
                    <div class="col-md-12 mb-3">
                    <v-text-field
                        v-model="pricevariation.price"
                        label="Preço"
                        :counter="150"
                        filled
                        variant="outlined"
                        dense
                        required
                        type="number"
                        :rules="defaultRules"
                    ></v-text-field>
                    </div>

                    <div class="col-md-12 mb-3">
                        <VueDatePicker placeholder="Data início" v-model="pricevariation.start_date" auto-apply locale="pt-BR" :format="format" :enable-time-picker="false"></VueDatePicker>
                    </div>

                    <div class="col-md-12 mb-3">
                        <VueDatePicker placeholder="Data fim" v-model="pricevariation.end_date" auto-apply locale="pt-BR" :format="format" :enable-time-picker="false"></VueDatePicker>
                    </div>
                    
                </div>

                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey-darken-1"
                    variant="text"
                    @click.prevent="ctrl.open_add_product = false"
                >
                    Cancelar
                </v-btn>
                <button
                    type="submit"
                    class="btn btn-success"
                    :disabled="ctrl.loading"
                >
                    Salvar
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


</template>

<script>

import ProductService from '@/services/ProductService';
import VariationService from '@/services/VariationService';
import RemoveDialog from "@/components/RemoveDialog.vue";
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {

    components:{
        RemoveDialog,
        Bar
    },
    async mounted() {
        const product = await this.productService.getProductById(this.$route.params.id);
        this.product = product.data;
        this.mountChart();

    },

    methods: {

        async mountChart(){

            this.product.pricevariations.forEach(e=>{
                this.daysChart.push(`${e.start_date} - ${e.end_date}`);
            })

            this.chartData = {
                labels: this.daysChart,
                datasets: [
                    {
                        label: 'Preço',
                        backgroundColor: '#f87979',
                        data: this.product.pricevariations.map(e=> e.price)
                    }
                ]
            }
        },

        async submit(){

            const entity = Object.assign({}, this.product)
            const { status } = await this.productService.saveProduct(entity);
            
            if(status != 'success'){
                this.$toast.error('Ocorreu um erro, tente novamente', {position: 'top-right' });
                return;
            }
            this.$toast.success('Produto editado com sucesso!',  {position: 'top-right' });
        },

        async submitPriceVariation() {
            this.products = [];
            this.pricevariation.product = this.product.id;
            const response = await this.variationService.addPrice(this.pricevariation);
            const data = response.data;

            if (response.status != "success") {
                for (const property in data) {
                this.$toast.error(`${property}: ${data[property]}`, {
                    position: "top-right",
                });
                }
                return;
            }
            this.ctrl.open_add_product = false;
            this.$toast.success('Preço adicionado com sucesso!',  {position: 'top-right' });

            const product = await this.productService.getProductById(this.$route.params.id);
            this.product = product.data;
            this.mountChart();
            this.pricevariation = {};

        },

        openEditDialog(pricevariation){
            this.pricevariation = {};
            this.pricevariation = pricevariation;
            this.ctrl.open_add_product = true;
        },

        openRemoveDialog(pricevariation){
            this.pricevariation = {};
            this.pricevariation = pricevariation;
            this.ctrl.dialog = true;
        },

        openRemoveThirdDialog(third){
            this.third = {};
            this.third = third;
            this.ctrl.dialog_third = true;
        },

        closeDialog(){
            this.ctrl.attachment = {};
            this.ctrl.dialog = false;
            this.ctrl.dialog_edit = false;
            this.ctrl.dialog_detail = false;
            this.ctrl.dialog_third = false;
            this.ctrl.dialog_publish = false;
        },
        
        async updateAttachment(){
            this.loading = true;
            const result = await this.variationService.updateAttachment(this.pricevariation);
            this.pricevariation = {};
            if(result.status != 'success'){
                this.ctrl.dialog_edit = false;
                this.$toast.error('Ocorreu um erro ao editar, tente novamente', {position: 'top-right' });
                return;
            }
 
            this.ctrl.dialog_edit = false;
            this.$toast.success('Arquivo editado com sucesso!',  {position: 'top-right' });
            this.pricevariation = {};
        },

        async deleteAttachment(){
            const result = await this.variationService.delete(this.pricevariation.id);
            if(result.status != 'success'){
                this.ctrl.dialog = false;
                this.$toast.error(`Erro ao remover o arquivo`, {position: 'top-right' });
                return;
            }
            this.product.pricevariations = this.product.pricevariations.filter(e=> e.id != this.pricevariation.id);
            this.ctrl.dialog = false;
            this.$toast.success(`Arquivo removido com sucesso!`,  {position: 'top-right' });
        },

        async upload() {

            if(!this.files.length){
                this.$toast.error('Anexe a imagem!', {position: 'top-right' });
                return
            }

            const response = await this.productService.upload(this.files, this.product.id)

            if(response.status != 'success'){
                this.$toast.error(response.data?.file, {position: 'top-right' });
            }

            this.product.image = response.data.image;

        },

    },

    data() {
        return {
            daysChart: [],
            chartData: {
                labels: [],
                datasets: [ { data: [] } ]
            },
            chartOptions: {
                responsive: true
            },

            pricevariation: {},
            files: [],
            defaultRules: [(val) => (val || "").length > 0 || "Campo obrigatório"],
            product: {pricevariations:[]},
            variationService: new VariationService(),
            productService: new ProductService(),
            ctrl:{
                loading: false,
                open_add_product: false,
                dialog_publish: false,
                loading_third: false,
                dialog: false,
                dialog_edit: false,
                dialog_detail: false,
            }
        }
    },
}
</script>