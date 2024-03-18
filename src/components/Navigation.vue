<template>
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation
        v-model="value"
        color="teal"
        horizontal
      >
        <v-btn @click="$router.push('/persons')">         
              Участники     
        </v-btn>
        <v-btn @click="$router.push('/bill')">
            Счет
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </template>

<script>
  export default {
    data: () => ({ value: 0}),
  }
</script>

<style >
    
</style>