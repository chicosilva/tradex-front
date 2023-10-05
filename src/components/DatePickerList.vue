<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          background-color="white"
          :label="label"
          readonly
          outlined
          dense
          filled
          v-model="dateFormatted"
          v-on="on"
        ></v-text-field>
      </template>

      <v-date-picker
        v-model="date"
        no-title
        scrollable
      >
        <v-spacer></v-spacer>
        
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "DatePickerList",
  methods: {
    clearDate(){
      this.date = null
    }
  },
  data: () => ({
    date: null,
    menu: false,
    dateFormatted: null,
    
  }),
  watch: {
    date() {
      
      this.dateFormatted = this.$options.filters.formatDatePicker(this.date)
      this.$refs.menu.save(this.date)
      this.$emit('input', this.dateFormatted)
      
    },
  },
  props: {
    label: {
      required:true
    }, 
  },
};
</script>