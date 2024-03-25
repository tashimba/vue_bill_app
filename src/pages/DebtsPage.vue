<template>
  <v-container style="width: 400px">
    
    <div v-if="personStore.persons.find((person) => person.debts.length)">
      <!-- <div v-if="personStore.persons.find((person) => person.debt)"> -->
        <h1 style="text-align: center">Долги</h1>
      <v-card 
      style="margin-bottom: 10px;"
      v-for="person in personStore.persons.filter((person => person.debts.length))"
      :key="person.id"
      :title="person.name"
      :subtitle="'Должен ' + person.debts.map(el => el.owner)"
      
      :text="'Сумма: ' + Math.round(person.debts.map(el => el.money)) + ' рубля'"
      variant="outlined"
      />
      <!-- </div> -->

    </div>
    <!-- <h1 v-else>Долгов нет</h1> -->

    <v-btn v-else  @click="getResult">Рассчитать</v-btn>
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
        if (count > 0){
          item.favorites.map((favorite) => {
          if (item.paying != favorite)
            this.personStore.addDebt(favorite, item.price / count, item.paying
             );
        });
        count = 0;
        }
      });
      this.billStore.calculated = true
      // this.personStore.reloadDebts()
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
