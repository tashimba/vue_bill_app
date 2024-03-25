<template>
  <v-container style="width: 400px">
    <h1 style="text-align: center">Долги</h1>
    <v-list v-if="personStore.persons.find((person) => person.debt)">
      <v-list-item
        class="list-item"
        v-for="person in personStore.persons"
        :key="person.id"
        :title="person.name"
      >
        <template v-slot:append>
          <div>{{ person.debt }}</div>
        </template>
        <template v-slot:prepend>
          <div>{{}}</div>
        </template>
      </v-list-item>
    </v-list>
    <v-btn v-else @click="getResult">Рассчитать</v-btn>
  </v-container>
</template>
<script>
import { useBillStore } from "../stores/useBillStore";
import { usePersonsStore } from "../stores/usePersonsStore";
export default {
  setup() {
    const personStore = usePersonsStore();
    const billStore = useBillStore();

    return {
      personStore,
      billStore,
    };
  },
  methods: {
    getResult() {
      let count = 0;
      this.billStore.items.map((item) => {
        count = item.favorites.length;
        item.favorites.map((favorite) => {
          if (item.paying != favorite)
            this.personStore.addDebt(favorite, item.price / count);
        });
        count = 0;
      });
    },
  },
};
</script>
<style>
.list-item {
  border: 1px solid rgba(0, 0, 0, 0.199);
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
