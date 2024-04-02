<template>
  <v-sheet class="mx-auto" width="400" style="padding: 20px">
    <v-form @submit.prevent>
      <v-text-field
        :error-messages="errorMessagesName"
        v-model.trim="inputName"
        label="Name"
        @click:clear="inputName = ''"
        clearable
      ></v-text-field>
      <v-text-field
        :error-messages="errorMessagesPrice"
        v-model.trim="inputPrice"
        label="Price"
        @click:clear="inputPrice = ''"
        clearable
        suffix="рубли"
      ></v-text-field>
      <v-btn class="mt-2" type="submit" block @click="handleClick">
        {{ !!data ? "Применить изменения" : "Добавить позицию" }}
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { useBillStore } from "../stores/useBillStore.js";
export default {
  props: {
    data: { type: Object },
  },
  setup() {
    const billStore = useBillStore();
    return {
      billStore,
    };
  },
  data() {
    return {
      inputName: this.data ? this.data.name : "",
      inputPrice: this.data ? this.data.price : "",
      errorMessagesName: "",
      errorMessagesPrice: "",
    };
  },
  methods: {
    handleClick() {
      if (this.checkInputValues()) {
        if (!!this.data) {
          this.billStore.changeItem({
            id: this.data.id,
            name: this.inputName,
            price: this.inputPrice,
          });
        } else {
          this.billStore.addItem({
            name: this.inputName,
            price: this.inputPrice,
          });
        }
        this.$emit("closeDialog");
      }
    },
    checkInputValues() {
      if (!this.inputName.length) {
        this.errorMessagesName = "Необходимо ввести имя";
        return false;
      }
      if (!this.inputPrice.length) {
        this.errorMessagesPrice = "Необходимо ввести цену";
        return false;
      }
      if (this.inputName.length > 20) {
        this.errorMessagesName = "Длина имени не должна превышать 20 букв";
        return false;
      }
      if (!this.data) {
        if (this.billStore.items.find((item) => item.name == this.inputName)) {
          this.errorMessagesName = "Продукт с таким именем уже создан";
          return false;
        }
      }
      if (!Number(this.inputPrice)) {
        this.errorMessagesPrice = "Цена должна быть числом";
        return false;
      } else if (!this.inputName.match(/[a-zA-Zа-яёА-ЯЁ ]/)) {
        this.errorMessagesName = "Имя должно содержать буквы";
        return false;
      } else return true;
    },
  },
  watch: {
    inputName() {
      this.errorMessagesName = "";
    },
    inputPrice() {
      this.errorMessagesPrice = "";
    },
  },
};
</script>
<style></style>
