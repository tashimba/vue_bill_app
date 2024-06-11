<template>
  <div class="h-100 test">
    <h1>Список участников</h1>
    <v-card class="mx-auto" max-width="500">
      <v-list class="py-0">
        <transition-group name="list">
          <v-list-item
            v-for="(person, i) in personStore.persons"
            :style="i != 0 && 'border-top: 1px solid rgba(0, 0, 0, 0.2)'"
            :key="person.id"
            :title="person.name"
          >
            <template v-slot:append>
              <v-icon
                icon="mdi-close"
                @click="deletePerson(person.id)"
              ></v-icon>
            </template>
          </v-list-item>
        </transition-group>
      </v-list>
    </v-card>

    <v-responsive class="mx-auto" max-width="500" style="margin: 25px 0">
      <v-text-field
        v-model.trim="inputValue"
        :error-messages="errorMessages"
        label="Добавить участника"
        clear-icon="mdi-close-circle"
        @click:append-inner="createPerson"
        @click:clear="inputValue = ''"
        clearable
      >
        <template v-slot:append-inner>
          <v-btn variant="elevated" size="30px" @click="createPerson">
            <v-icon icon="mdi-plus"> </v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-responsive>
  </div>
</template>

<script setup>
import { usePersonsStore } from "../stores/usePersonsStore.js";
import { ref, watch } from "vue";

const personStore = usePersonsStore();

const { addPerson, deletePerson } = personStore;

const props = defineProps({
  personId: {
    type: String,
    default: "",
  },
});

const inputValue = ref("");
const errorMessages = ref("");
const createPerson = () => {
  if (checkName()) {
    addPerson(inputValue.value);
    inputValue.value = "";
  }
};
const checkName = () => {
  if (!inputValue.value.length) {
    errorMessages.value = "Необходимо ввести имя";
  } else if (inputValue.value.length > 20) {
    errorMessages.value = "Длина имени не должна превышать 20 букв";
  } else if (
    personStore.persons.find((person) => person.name == inputValue.value)
  ) {
    errorMessages.value = "Участник с таким именем уже создан";
  } else if (!inputValue.value.match(/[a-zA-Zа-яёА-ЯЁ ]/)) {
    errorMessages.value = "Имя должно содержать буквы";
  } else return true;
};
watch(inputValue, () => {
  errorMessages.value = "";
});
</script>

<style scoped lang="scss">
.list {
  &-enter {
    &-active {
      transition: all 0.3s ease;
    }
    &-from {
      opacity: 0;
      transform: translateX(-30px);
    }
  }
  &-leave {
    &-active {
      transition: all 0.3s ease;
    }
    &-to {
      opacity: 0;
      transform: translateX(-30px);
    }
  }
}
</style>
