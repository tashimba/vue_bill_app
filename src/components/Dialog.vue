<template>
    <div class="text-center pa-4">
      <v-btn @click="dialog = true">
        Добавить позицию
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="600"
          title="Добавление позиции"
        >
        <FormAddItem @closeDialog="dialog = false"/>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script>
import FormAddItem from './FormAddItem.vue';
  export default {
    components:{
        FormAddItem
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>

<style lang="">
    
</style>