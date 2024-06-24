import { defineStore } from "pinia";
import { usePersonsStore } from "./usePersonsStore";

export const useBillStore = defineStore("bill", {
  state: () => {
    return {
      items: [],
    };
  },

  actions: {
    addItem(obj) {
      const newItem = {
        ...obj,
        id: Date.now(),
        using: [],
        paying: null,
      };
      this.items.push(newItem);
    },

    deleteItem(id) {
      this.items = this.items.filter((el) => el.id !== id);
      this.getResult();
    },

    changeItem(data) {
      this.items = this.items.map((item) => {
        if (item.id === data.id) {
          item.name = data.name;
          item.price = data.price;
        }
        return item;
      });
    },

    getResult() {
      const personsStore = usePersonsStore();
      personsStore.deleteDebts();
      let count = 0;
      this.items.map((item) => {
        count = item.using.length;
        if (count > 0) {
          item.using.map((favorite) => {
            if (item.paying && item.paying != favorite)
              personsStore.addDebt(favorite, item.price / count, item.paying);
          });
          count = 0;
        }
      });
    },

    deletePersonFromUsing(id) {
      this.items.forEach((item) => {
        item.using = item.using.filter((el) => el != id);
        item.paying = item.paying === id ? null : item.paying;
      });
    },
  },

  getters: {
    hasAnySpending: (state) => () => {
      return state.items.find((item) => item.paying && item.using.length);
    },
    getSpendingsArray: (state) => () => {
      const spendingsArray = [];
      state.items.forEach((item) => {
        const existingSendingOwner = spendingsArray.find((el) => el.personId === item.paying)
        if (existingSendingOwner) {
          existingSendingOwner.price += +item.price
        }
        else{
          spendingsArray.push({personId: item.paying, price: +item.price});
        }
      })
      return spendingsArray
    },
  },
});
