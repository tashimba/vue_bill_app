<template>
  <v-select
    v-model="bill.using"
    :items="getPersons()"
    hide-details="auto"
    item-title="name"
    item-value="id"
    label="Пользовались"
    multiple
    chips
  ></v-select>
  <v-select
    v-model="bill.paying"
    :items="getPersons()"
    item-title="name"
    item-value="id"
    label="Заплатил"
    chips
  ></v-select>
</template>

<script setup>
import { useBillStore } from "../stores/useBillStore";
import { usePersonsStore } from "../stores/usePersonsStore.js";
import { watch } from "vue";

const props = defineProps({
  ItemId: { type: Number, required: true, default: null },
});

const { getPersons } = usePersonsStore();
const { items: billItems, getResult } = useBillStore();

const bill = billItems.find((item) => item.id == props.ItemId);

watch(bill, () => {
  if (bill.using.length && bill.paying) {
    getResult();
  }
});
</script>

<style></style>
