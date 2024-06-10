<template>
  <div v-if="personStore.persons.find((person) => person.debts.length)">
    <h1 style="text-align: center">Долги</h1>
    <v-card
      class="mx-auto"
      max-width="500"
      style="margin-bottom: 10px; padding: 0 10px"
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

<script setup>
import { useBillStore } from "../stores/useBillStore";
import { usePersonsStore } from "../stores/usePersonsStore";
import { ref } from "vue";

const personStore = usePersonsStore();
const billStore = useBillStore();

// const debtOwners = ref([]);

const getDebtOwners = (person) => {
  let debtOwners = [];
  person.debts.forEach((debt) => {
    personStore.persons.forEach((pers) => {
      if (pers.id === debt.owner) {
        debtOwners.push({ ownerName: pers.name, debtOwning: debt.money });
      }
    });
  });
  return debtOwners
    .map((el) => el.ownerName + " на сумму " + el.debtOwning + " рублей")
    .join(",\n" + "\t");
};
</script>

<style>
div {
  white-space: pre-line;
}
</style>
