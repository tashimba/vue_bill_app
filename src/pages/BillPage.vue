<template>
  <h1>Счет</h1>
  <v-card class="mx-auto" max-width="500">
    <v-list>
      <transition-group name="list">
        <v-list-group
          v-for="item in billStore.items"
          :key="item.id"
          :value="item"
          :title="item.name"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="item.name"
              :subtitle="`Цена: ${item.price} ${
                item.price % 10 == 1
                  ? 'рубль'
                  : item.price % 10 >= 2 && item.price % 10 <= 4
                  ? 'рубля'
                  : 'рублей'
              }`"
            >
            </v-list-item>
          </template>

          <div class="btns-container">
            <Dialog :item="item"></Dialog>
            <v-btn
              density="compact"
              class="btn"
              variant="outlined"
              prepend-icon="mdi-delete"
              @click="deleteItem(item.id)"
            >
              Удалить
            </v-btn>
          </div>

          <Select :ItemId="item.id"></Select>
        </v-list-group>
      </transition-group>
    </v-list>
  </v-card>

  <div class="text-center pa-4">
    <Dialog></Dialog>
  </div>
</template>
<script>
import Dialog from "../components/Dialog.vue";
import Select from "../components/Select.vue";
import { useBillStore } from "../stores/useBillStore.js";
import { usePersonsStore } from "../stores/usePersonsStore.js";
export default {
  setup() {
    const billStore = useBillStore();
    const personStore = usePersonsStore();
    return {
      billStore,
      personStore,
    };
  },
  components: { Dialog, Select },

  methods: {
    deleteItem(itemId) {
      this.billStore.deleteItem(itemId);
    },
  },
};
</script>
<style scoped>
.btns-container {
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  margin: 5px 15px;
}
.btn {
  min-width: 50%;
}
</style>
