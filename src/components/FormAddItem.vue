<template>
  <v-sheet class="mx-auto" width="300" style="padding: 20px">
    <v-form @submit.prevent>
      <v-text-field v-model="name" :rules="rules" label="Name"></v-text-field>
      <v-text-field v-model="price" :rules="rules" label="Price"></v-text-field>
      <v-btn class="mt-2" type="submit" block @click="handleClick"
        >Добавить</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script>
import { useBillStore } from "../stores/useBillStore.js";
export default {
  setup() {
    const billStore = useBillStore();
    return {
      billStore,
    };
  },
  data: () => ({
    name: "",
    price: "",
    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a name.";
      },
    ],
  }),
  methods: {
    handleClick() {
      this.billStore.addItem({ name: this.name, price: this.price });
      this.$emit("closeDialog");
    },
  },
};
</script>
<style></style>
