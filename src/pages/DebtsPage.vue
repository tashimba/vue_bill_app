<template>
  <div v-if="hasAnyDebts()">
    <h1 style="text-align: center">Долги</h1>
    <v-card
      v-for="person in getPersonsWithDebts()"
      :key="person.id"
      :title="person.name"
      elevation="6"
      class="mx-auto"
      max-width="500"
      style="margin-bottom: 10px; padding: 0 10px"
    >
      <template #subtitle> Должен: </template>
      <template #text>
        <div>
          {{ getDebtOwners(person) }}
        </div>
      </template>
    </v-card>
  </div>
  <h1 v-else>Долгов нет</h1>
</template>

<script setup>
import { usePersonsStore } from "../stores/usePersonsStore";

const { persons, hasAnyDebts, getPersonsWithDebts } = usePersonsStore();

const getDebtOwners = (person) => {
  let debtOwners = [];
  person.debts.forEach((debt) => {
    persons.forEach((pers) => {
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
