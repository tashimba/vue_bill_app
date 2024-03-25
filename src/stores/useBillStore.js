import { defineStore } from "pinia";

export const useBillStore = defineStore("bill", {
  state: () => {
    return {
      items: [
        {
          id: 1,
          name: "Item 1",
          price: 100,
          favorites: [1,2],
          paying: 1,
        },
        {
          id: 2,
          name: "Item 2",
          price: 100,
          favorites: [1,2],
          paying: 2,
        },
      ],
      calculated: false
    };
  },

  actions: {
    addItem(obj) {
      const newItem = {
        ...obj,
        id: Date.now(),
        favorites: [],
      };
      this.items.unshift(newItem);
      this.calculated = false

    },
    deleteItem(id) {
      this.items = this.items.filter((el) => el.id !== id);
    },
  },
});
