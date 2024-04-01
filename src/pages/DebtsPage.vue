<template>
  <div v-if="personStore.persons.find((person) => person.debts.length)">
    <h1 style="text-align: center">Долги</h1>
    <v-card
      class="mx-auto"
      max-width="500"
      style="margin-bottom: 10p; padding: 0 10px"
      v-for="person in personStore.persons.filter(
        (person) => person.debts.length
      )"
      :key="person.id"
      :title="person.name"
      elevation="6"
    >
      <template v-slot:subtitle> Должен: </template>

      <template v-slot:text>
        <div>
          {{ getDebtOwners(person) }}
        </div>
      </template>
    </v-card>
  </div>
  <h1 v-else>Долгов нет</h1>
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
  data() {
    return {
      debtOwners: [],
      calculated: false,
    };
  },

  methods: {
    getResult() {
      this.personStore.persons.map((el) => (el.debts = []));
      let count = 0;
      this.billStore.items.map((item) => {
        count = item.favorites.length;
        if (count > 0) {
          item.favorites.map((favorite) => {
            if (item.paying != favorite)
              this.personStore.addDebt(
                favorite,
                item.price / count,
                item.paying
              );
          });
          count = 0;
        }
      });
    },

    getDebtOwners(person) {
      let debtOwners = [];
      person.debts.forEach((debt) => {
        this.personStore.persons.forEach((pers) => {
          if (pers.id === debt.owner) {
            debtOwners.push({ ownerName: pers.name, debtOwning: debt.money });
          }
        });
      });
      return (
        // "Должен:\n" +
        debtOwners
          .map((el) => el.ownerName + " на сумму " + el.debtOwning + " рублей")
          .join(",\n" + "\t")
      );
    },
  },
};
</script>

<style>
div {
  white-space: pre-line;
}
</style>
