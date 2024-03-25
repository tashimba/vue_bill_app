<template>
  <v-select
    hide-details="auto"
    class="select"
    :items="personsStore.persons"
    item-title="name"
    item-value="id"
    v-model="bill.favorites"
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

export default {
  props: {
    ItemId: { required: true },
  },
  setup(props) {
    const personsStore = usePersonsStore();
    const billStore = useBillStore();
    const bill = billStore.items.find((item) => item.id == props.ItemId);
    return {
      personsStore,
      billStore,
      bill,
    };
  },
  data() {
    return {};
  },
};
</script>

<style>
.select {
  margin: 0;
  padding: 0;
}
</style>
