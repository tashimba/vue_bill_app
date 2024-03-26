<template>
  <v-responsive class="mx-auto" max-width="500">
    <v-text-field v-model="inputValue" label="Имя" append-inner-icon="mdi-check-bold"  @click:append-inner="addPerson"/>
  </v-responsive>
  <v-card class="mx-auto" max-width="500">
    
    <v-list>
      <transition-group name="list">
      <v-list-item
        v-for="person in store.persons"
        :key="person.id"
        :value="person"
        :title="person.name"
      >
        <template v-slot:append>
          <v-icon
            icon="mdi-close"
            @click="store.deletePerson(person.id)"
          ></v-icon>
        </template>
      </v-list-item>
    </transition-group> 
    </v-list>
  </v-card>
</template>

<script>
import { usePersonsStore } from "../stores/usePersonsStore.js";
export default {
  setup() {
    const store = usePersonsStore();
    return {
      store,
    };
  },
  data: () => ({
    inputValue: "",
  }),
  methods:{
    addPerson(){
      this.store.addPerson(this.inputValue)
      this.inputValue = ""
    }
  }
};
</script>
<style>
 
.list-enter-active{
  transition: all .3s ease;
}
.list-leave-active {
  transition: all .3s ease;
}
.list-enter-from{
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);

}
</style>
