<template>
  <v-btn
    v-if="!!item"
    density="compact"
    class="btn"
    variant="outlined"
    prepend-icon="mdi-pencil"
    @click="openState = true"
  >
    Редактировать
  </v-btn>

  <v-btn
    v-else
    width="500"
    size="large"
    variant="tonal"
    elevation="2"
    @click="openState = true"
  >
    Добавить позицию
  </v-btn>

  <v-dialog v-model="openState" width="auto">
    <v-card
      max-width="600"
      :title="item ? 'Изменение позиции' : 'Добавление позиции'"
    >
      <FormAddItem @closeDialog="openState = false" :data="!!item && item" />
    </v-card>
  </v-dialog>
</template>

<script>
import FormAddItem from "./FormAddItem.vue";
export default {
  components: {
    FormAddItem,
  },
  props: {
    item: {},
  },
  data() {
    return {
      openState: false,
    };
  },
};
</script>

<style></style>
