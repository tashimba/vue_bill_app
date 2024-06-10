<template>
  <v-select
    hide-details="auto"
    class="select"
    v-model="bill.using"
    :items="personsStore.persons"
    item-title="name"
    item-value="id"
    label="Пользовались"
    multiple
    chips
  ></v-select>
  <v-select
    v-model="bill.paying"
    :items="personsStore.persons"
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

const personsStore = usePersonsStore();
const billStore = useBillStore();
const bill = billStore.items.find((item) => item.id == props.ItemId);

watch(bill, () => {
  if (bill.using.length && bill.paying) {
    billStore.getResult();
  }
});
</script>

<style>
.select {
  margin: 0;
  padding: 0;
}
</style>
