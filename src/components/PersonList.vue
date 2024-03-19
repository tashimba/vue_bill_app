<template>  
    <v-responsive
      class="mx-auto"
      max-width="400"
    >
      <v-text-field
          v-model="inputValue"
          label="Name"
      ></v-text-field>
      <v-btn  @click="store.addPerson(inputValue)">Добавить</v-btn> 
    </v-responsive>

    <v-card
      class="mx-auto"
      max-width="400"
    >
    <v-list>
            <v-list-item
              v-for="person in store.persons"
              :key='person.id'
              :value="person"
              :title="person.name"
            >
            <template v-slot:append >
              <v-icon icon='mdi-close' @click="store.deletePerson(person.id)"></v-icon>
            </template>
          </v-list-item>
          </v-list>
    </v-card>
</template>

<script>
import {usePersonsStore} from "../store/usePersonsStore.js"
  export default {
    setup(){
      const store = usePersonsStore()
      return {
        store
      }
    },
    data: () => ({
      inputValue:""
    }
    ),
  }
</script>
<style>
    
</style>