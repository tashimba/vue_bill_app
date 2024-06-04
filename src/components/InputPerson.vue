<template>
  <v-responsive class="mx-auto" max-width="500" style="margin: 25px 0">
    <v-text-field
      v-model.trim="inputValue"
      :error-messages="errorMessages"
      label="Добавить участника"
      clear-icon="mdi-close-circle"
      @click:append-inner="addPerson"
      @click:clear="inputValue = ''"
      clearable
    >
      <template v-slot:append-inner>
        <v-btn variant="elevated" size="30px">
          <v-icon icon="mdi-plus" @click="addPerson"> </v-icon>
        </v-btn>
      </template>
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
  props: {
    personId: {
      type: String,
    },
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
      if (!this.inputValue.length) {
        this.errorMessages = "Необходимо ввести имя";
      } else if (this.inputValue.length > 20) {
        this.errorMessages = "Длина имени не должна превышать 20 букв";
      } else if (
        this.store.persons.find((person) => person.name == this.inputValue)
      ) {
        this.errorMessages = "Участник с таким именем уже создан";
      } else if (!this.inputValue.match(/[a-zA-Zа-яёА-ЯЁ ]/)) {
        this.errorMessages = "Имя должно содержать буквы";
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
