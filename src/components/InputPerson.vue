<template>
  <v-responsive class="mx-auto" max-width="500" style="margin: 15px 0">
    <v-text-field
      v-model="inputValue"
      :error-messages="errorMessages"
      label="Добавить участника"
      append-inner-icon="mdi-plus"
      clear-icon="mdi-close-circle"
      @click:append-inner="addPerson"
      @click:clear="inputValue = ''"
      clearable
    >
    </v-text-field>
  </v-responsive>
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
    errorMessages: "",
  }),
  methods: {
    addPerson() {
      if (this.checkName()) {
        this.store.addPerson(this.inputValue);
        this.inputValue = "";
      }
    },
    checkName() {
      if (!this.inputValue) {
        this.errorMessages = "Необходимо ввести имя";
      } else if (this.inputValue.length > 10) {
        this.errorMessages = "Длина имени не должна превышать 10 букв";
      } else if (
        this.store.persons.find((person) => person.name == this.inputValue)
      ) {
        this.errorMessages = "Участник с таким именем уже создан";
      } else return true;
    },
  },
  watch: {
    inputValue() {
      this.errorMessages = "";
    },
  },
};
</script>
<style></style>
