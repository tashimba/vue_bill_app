<template>
  <h1>Список участников</h1>
  <v-card class="mx-auto" max-width="500">
    <v-list class="py-0">
      <transition-group name="list">
        <v-list-item
          v-for="(person, i) in store.persons"
          :style="i != 0 && 'border-top: 1px solid rgba(0, 0, 0, 0.2)'"
          :key="person.id"
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
  <InputPerson />
</template>

<script>
import { usePersonsStore } from "../stores/usePersonsStore.js";
import InputPerson from "../components/InputPerson.vue";
export default {
  name: "PersonListPage",
  components: {
    InputPerson,
  },
  setup() {
    const store = usePersonsStore();
    return {
      store,
    };
  },
};
</script>
<style scoped>
.list-enter-active {
  transition: all 0.3s ease;
}
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.addIcon {
  cursor: pointer;
  padding: 5px;
}
.addIcon:hover {
  transition: 0.1s ease-in;
  border: 1px solid;
  border-radius: 5px;
}
</style>
