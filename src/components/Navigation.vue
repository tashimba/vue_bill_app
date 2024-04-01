<template>
  <v-layout class="overflow-visible" style="height: 30px">
    <v-bottom-navigation v-model="value" color="teal" horizontal mandatory>
      <v-btn @click="$router.push('/')"> Участники </v-btn>
      <v-btn @click="$router.push('/bill')"> Счет </v-btn>
      <v-btn @click="$router.push('/debts')"> Долги </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
export default {
  data: () => ({ value: 0 }),
};
</script>

<style></style>
