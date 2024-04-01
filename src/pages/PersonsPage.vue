<template>
  <h1>Список участников</h1>
  <PersonList />
</template>

<script>
import PersonList from "../components/PersonList.vue/";
export default {
  components: { PersonList },
};
</script>

<style>
h1 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
