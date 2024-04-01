<template>
  <Navigation />
  <RouterView></RouterView>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  components: {
    Navigation,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
