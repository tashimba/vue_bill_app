import { defineStore } from "pinia";
import { usePersonsStore } from "./usePersonsStore";

export const useBillStore = defineStore("bill", {
  state: () => {
    return {
      items: [
        {
          id: 1,
          name: "Item 1",
          price: 200,
          favorites: [],
          paying: 1,
        },
        {
          id: 2,
          name: "Item 2",
          price: 100,
          favorites: [],
          paying: 2,
        },
        {
          id: 3,
          name: "Item 3",
          price: 300,
          favorites: [],
          paying: 3,
        },
      ],
    };
  },

  actions: {
    addItem(obj) {
      const newItem = {
        ...obj,
        id: Date.now(),
        favorites: [],
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
        count = item.favorites.length;
        if (count > 0) {
          item.favorites.map((favorite) => {
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
  },
});
