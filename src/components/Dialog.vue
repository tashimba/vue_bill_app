<template>
  <v-btn
    v-if="!item"
    width="500"
    size="large"
    variant="tonal"
    elevation="2"
    @click="openState = true"
  >
    Добавить позицию
  </v-btn>

  <v-dialog activator="parent" width="auto">
    <template v-slot:default="{ isActive }">
      <v-card
        max-width="600"
        :title="item ? 'Изменение позиции' : 'Добавление позиции'"
      >
        <template v-slot:actions>
          <v-sheet class="mx-auto" width="400" style="padding: 20px">
            <v-form @submit.prevent>
              <v-text-field
                :error-messages="errorMessagesName"
                v-model.trim="inputName"
                label="Название"
                @click:clear="inputName = ''"
                clearable
              ></v-text-field>
              <v-text-field
                :error-messages="errorMessagesPrice"
                v-model.trim="inputPrice"
                label="Цена"
                @click:clear="inputPrice = ''"
                clearable
                suffix="рубли"
              ></v-text-field>
              <v-btn
                class="mt-2"
                type="submit"
                block
                @click="() => handleClick(item)"
              >
                {{ !!data ? "Применить изменения" : "Добавить позицию" }}
              </v-btn>
            </v-form>
          </v-sheet>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import FormAddItem from "./FormAddItem.vue";
import { ref } from "vue";
const props = defineProps({
  openDialog: { type: Boolean },
  item: { type: Object },
});

const openState = ref(false);

import { useBillStore } from "../stores/useBillStore.js";

const billStore = useBillStore();

const inputName = this.data ? this.data.name : "";
const inputPrice = this.data ? this.data.price : "";
const errorMessagesName = "";
const errorMessagesPrice = "";

const handleClick = (data) => {
  if (checkInputValues(data)) {
    if (!!data) {
      this.billStore.changeItem({
        id: data.id,
        name: inputName,
        price: inputPrice,
      });
    } else {
      billStore.addItem({
        name: inputName,
        price: inputPrice,
      });
    }
  }
};

const checkInputValues = (data) => {
  if (!inputName.length) {
    errorMessagesName = "Необходимо ввести имя";
    return false;
  }
  if (!inputPrice.length) {
    errorMessagesPrice = "Необходимо ввести цену";
    return false;
  }
  if (inputName.length > 20) {
    errorMessagesName = "Длина имени не должна превышать 20 букв";
    return false;
  }
  if (!data) {
    if (billStore.items.find((item) => item.name == inputName)) {
      errorMessagesName = "Продукт с таким именем уже создан";
      return false;
    }
  }
  if (!Number(inputPrice)) {
    errorMessagesPrice = "Цена должна быть числом";
    return false;
  } else if (!inputName.match(/[a-zA-Zа-яёА-ЯЁ ]/)) {
    errorMessagesName = "Имя должно содержать буквы";
    return false;
  } else return true;
};
</script>

<style></style>
