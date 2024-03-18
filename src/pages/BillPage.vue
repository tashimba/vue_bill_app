<template>
    <div>
        <Dialog/>
        <v-card
      class="mx-auto"
      max-width="400"
    >
    <v-list
      :items="items"
      item-title="name"
      item-value="id"
    ></v-list>
    </v-card>
    </div>
</template>
<script>
import Dialog from '../components/Dialog.vue';
export default {
    components:{Dialog},
    data: () => ({
        items:
    })
}
</script>
<style>
    
</style>