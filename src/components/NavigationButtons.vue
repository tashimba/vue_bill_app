<template>
  <v-card
    class="d-flex justify-center w-100"
    style="height: 50px"
    elevation="0"
  >
    <v-btn
      v-for="(route, i) in routes"
      :key="i"
      :color="navValue === i ? 'primary' : ''"
      :variant="navValue === i ? 'tonal' : 'text'"
      :text="route.name"
      class="h-100"
      rounded="0"
      @click="handleClick(route, i)"
    >
    </v-btn>
  </v-card>
  <v-divider class="mb-5" />
</template>

<script setup>
import { ref } from "vue";
import router from "../router/router.js";
const routes = [
  {
    name: "Участники",
    namePath: "home",
  },
  {
    name: "Счет",
    namePath: "bill",
  },
  {
    name: "Долги",
    namePath: "debts",
  },
];

const navValue = ref(+sessionStorage.getItem("navigationValue") || 0);

const handleClick = (route, i) => {
  navValue.value = routes.indexOf(route, i);
  router.push({ name: route.namePath });
  sessionStorage.setItem("navigationValue", navValue.value);
};
</script>

<style></style>
