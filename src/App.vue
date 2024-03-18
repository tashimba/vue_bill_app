<template>
  
  <Navigation />
  <RouterView></RouterView>
</template>

<script>
import PersonList from './components/PersonList.vue/';
import Navigation from './components/Navigation.vue';
export default{
  components:{
    PersonList, Navigation
  },
  data: () => ({
  }),

}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
