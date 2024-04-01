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
      this.items.unshift(newItem);
    },

    deleteItem(id) {
      this.items = this.items.filter((el) => el.id !== id);
      this.getResult();
    },

    changeItem(data) {
      this.items = this.items.map((item) => {
        if (item.id == data.id) {
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
            if (item.paying != favorite)
              personsStore.addDebt(
                favorite,
                Math.ceil(item.price / count),
                item.paying
              );
          });
          count = 0;
        }
      });
    },

    deletePersonFromUsing(id) {
      this.items.forEach((item) => {
        item.using = item.using.filter((el) => el != id);
        item.paying = item.paying == id ? null : item.paying;
        this.getResult();
      });
    },
  },
});
