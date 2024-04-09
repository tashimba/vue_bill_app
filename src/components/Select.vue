<template>
  <v-select
    hide-details="auto"
    class="select"
    :items="personsStore.persons"
    item-title="name"
    item-value="id"
    v-model="bill.using"
    label="Пользовались"
    multiple
    chips
  ></v-select>
  <v-select
    :items="personsStore.persons"
    item-title="name"
    item-value="id"
    v-model="bill.paying"
    label="Заплатил"
    chips
  ></v-select>
</template>

<script>
import { useBillStore } from "../stores/useBillStore";
import { usePersonsStore } from "../stores/usePersonsStore.js";
import { watch } from "vue";

export default {
  props: {
    ItemId: { type: Number, required: true },
  },
  setup(props) {
    const personsStore = usePersonsStore();
    const billStore = useBillStore();
    const bill = billStore.items.find((item) => item.id == props.ItemId);

    watch(bill, () => {
      if (bill.using.length && bill.paying) {
        billStore.getResult();
      }
    });

    return {
      personsStore,
      bill,
    };
  },
};
</script>

<style>
.select {
  margin: 0;
  padding: 0;
}
</style>
