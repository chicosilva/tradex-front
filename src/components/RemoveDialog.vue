<template>
 
  <v-dialog
      :value="value"
      width="500"
      @input="$emit('input', $event)"
    >
      <v-card>
        <v-card-title class="text-h5">
          Confirme?
        </v-card-title>
        <v-card-text>
            Tem certeza?
            <br>
            <span style="color:red">Essa ação não poderá ser desfeita.</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click.prevent="close"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red"
            variant="text"
            @click.stop="save"
          >
            Sim, remover
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  
</template>

<script>
  export default {
    
      props: {
          value: Boolean, 
          obj_title: String,
      },
      data() {
          return {
              
          }
      },
      methods: {
          save() {
             this.$emit('remove-object-context')
          },
          close() {
              this.$emit('close-dialog')
          },
      },
  }
</script>