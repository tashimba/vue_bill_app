<template>
  <v-container>
    <v-row v-if="hasAnySpending()">
      <v-col>
        <div>
          <h1>Траты</h1>
          <v-card
            v-for="spending in getSpendingsArray()"
            :key="spending.personId"
            :title="getPersonName(spending.personId)"
            elevation="6"
            class="mx-auto"
            max-width="500"
            style="margin-bottom: 10px; padding: 0 10px"
          >
            <template #subtitle> Потратил: </template>

            <template #text>
              <div>
                {{ getStringPrice(spending.price) }}
              </div>
            </template>
          </v-card>
        </div>
      </v-col>
      <v-col>
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
      </v-col>
    </v-row>
    <h1 v-else>Покупок не было</h1>
  </v-container>
</template>

<script setup>
import { usePersonsStore } from "../stores/usePersonsStore";
import { useBillStore } from "../stores/useBillStore";
import { getStringPrice } from "../functions/getStringPrice";

const { getPersons, hasAnyDebts, getPersonsWithDebts, getPersonName } = usePersonsStore();
const { hasAnySpending, getSpendingsArray } = useBillStore();

const getDebtOwners = (person) => {
  let debtOwners = [];
  person.debts.forEach((debt) => {
    getPersons().forEach((pers) => {
      if (pers.id === debt.owner) {
        debtOwners.push({ ownerName: pers.name, debtOwning: debt.money });
      }
    });
  });
  return debtOwners
    .map((el) => el.ownerName + " на сумму " + getStringPrice(el.debtOwning))
    .join(",\n" + "\t");
};

</script>

<style>
div {
  white-space: pre-line;
}
</style>
