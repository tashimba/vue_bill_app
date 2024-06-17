<template>
  <v-dialog activator="parent" width="auto">
    <template v-slot:default="{ isActive }">
      <v-card
        max-width="600"
        :title="props.item ? 'Изменение позиции' : 'Добавление позиции'"
      >
        <template v-slot:actions>
          <v-sheet 
            class="mx-auto" 
            width="400" 
            style="padding: 20px">
            <v-form @submit.prevent>
              <v-text-field
                v-model.trim="inputName"
                :error-messages="errorMessagesName"
                label="Название"
                clearable
                @click:clear="inputName = ''"
              ></v-text-field>
              <v-text-field
                v-model.trim="inputPrice"
                :error-messages="errorMessagesPrice"
                label="Цена"
                suffix="рубли"
                clearable
                @click:clear="inputPrice = ''"
              ></v-text-field>
              <v-btn
                class="mt-2"
                type="submit"
                block
                variant="tonal"
                @click="() => handleClick(isActive)"
              >
                {{ !!props.item ? "Применить изменения" : "Добавить позицию" }}
              </v-btn>
            </v-form>
          </v-sheet>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useBillStore } from "../stores/useBillStore.js";

const props = defineProps({
  item: { type: Object, default: null },
});

const { getBills, changeItem, addItem } = useBillStore();

const inputName = ref(props.item?.name ?? "");
const inputPrice = ref(props.item?.price ?? "");
const errorMessagesName = ref("");
const errorMessagesPrice = ref("");

const handleClick = (isActive) => {
  if (checkInputValues(props.item)) {
    if (!!props.item) {
      changeItem({
        id: props.item.id,
        name: inputName.value,
        price: inputPrice.value,
      });
    } else {
      addItem({
        name: inputName.value,
        price: inputPrice.value,
      });
      inputName.value = "";
      inputPrice.value = "";
    }
    isActive.value = false;
  }
};

const checkInputValues = () => {
  if (!inputName.value.length) {
    errorMessagesName.value = "Необходимо ввести имя";
    return false;
  }
  if (!inputPrice.value.length) {
    errorMessagesPrice.value = "Необходимо ввести цену";
    return false;
  }
  if (inputName.value.length > 20) {
    errorMessagesName.value = "Длина имени не должна превышать 20 букв";
    return false;
  }
  if (!props.item) {
    if (getBills().find((item) => item.name == inputName.value)) {
      errorMessagesName.value = "Продукт с таким именем уже создан";
      return false;
    }
  }
  if (!Number(inputPrice.value)) {
    errorMessagesPrice.value = "Цена должна быть числом";
    return false;
  } else if (!inputName.value.match(/[a-zA-Zа-яёА-ЯЁ ]/)) {
    errorMessagesName.value = "Имя должно содержать буквы";
    return false;
  } else return true;
};

watch(inputName, () => {
  errorMessagesName.value = "";
});
watch(inputPrice, () => {
  errorMessagesPrice.value = "";
});
</script>

<style></style>
