<template>
  <v-container style="width: 400px">
    
    <div v-if="personStore.persons.find((person) => person.debts.length)">
        <h1 style="text-align: center">Долги</h1>
      <v-card 
      style="margin-bottom: 10px;"
      v-for="person in personStore.persons.filter((person => person.debts.length))"
      :key="person.id"
      :title="person.name"
      variant="outlined"
      >
      <template v-slot:text>
        <div>
          {{ getDebtOwners(person ) }}
      </div>
      </template>
    </v-card>
    </div>

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
  data(){
    return {
      debtOwners:[]
    }
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
    getDebtOwners(person){
      let debtOwners = [];
        person.debts.forEach(debt => {
          this.personStore.persons.forEach(pers => {
            if (pers.id === debt.owner) {
              debtOwners.push({ownerName: pers.name, debtOwning: debt.money });
            }
          });
        });
        return 'Должен:\n' +  debtOwners.map(el => el.ownerName + ' на сумму ' + el.debtOwning ).join(',\n' + "\t")
      }
  },
};
</script>
<style>
.list-item {
  border: 1px solid blanchedalmond;
  border-radius: 10px;
  margin-bottom: 10px;
}
div {
      white-space: pre-line;
  }
</style>
