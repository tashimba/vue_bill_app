<template>
    <v-select
      v-model="billStore.favorites"
      :items="personsStore.persons.map(el => el.name)"
      label="Select"
      multiple
      chips
    ></v-select>
</template>

<script>
import { useBillStore } from '../store/useBillStore';
import { usePersonsStore } from '../store/usePersonsStore.js';

  export default {
    setup(){
        const personsStore = usePersonsStore()
        const billStore = useBillStore()
        personsStore.persons.map(el => console.log(el.name))
        return{
            personsStore, billStore
        }
    },
    data () {
      return {
      }
    },
  }
</script>

<style >
    
</style>