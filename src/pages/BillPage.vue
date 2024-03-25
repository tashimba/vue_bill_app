<template>
  <v-container>
    <Dialog @addItem="addItem" />

    <v-card class="mx-auto" max-width="600">
      <v-list>
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
              :subtitle="'Цена: ' + item.price + ' рублей'"
            ></v-list-item>
          </template>

          <Select :ItemId="item.id" />
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
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
  data() {
    return {};
  },
  methods: {},
};
</script>
<style></style>
