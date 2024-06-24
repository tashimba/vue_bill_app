<template>
  <NavigationButtons />
  <RouterView></RouterView>
</template>

<script setup>
import NavigationButtons from "./components/NavigationButtons.vue";
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
h1 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
