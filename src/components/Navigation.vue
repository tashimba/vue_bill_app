<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="value" color="teal" horizontal mandatory>
      <v-btn @click="$router.push('/persons')"> Участники </v-btn>
      <v-btn @click="$router.push('/bill')"> Счет </v-btn>
      <v-btn @click="$router.push('/debts')"> Долги </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
export default {
  data: () => ({ value: undefined }),
};
</script>

<style></style>
