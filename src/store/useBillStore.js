import { defineStore } from 'pinia'

export const useBillStore = defineStore('bill', {
  state: () => {
    return {
        items: [
            {
              id: 1,
              name: 'Item 1',
              price: 100
            },

          ],
     }
  },
  
  actions: {
    addItem(obj) {
        const newItem = {
            ...obj,
            id: Date.now()
        }
        this.items.unshift(newItem)
    },
    deleteItem(id){
        this.items = this.items.filter(el => el.id !== id)
      }
  },
  
})