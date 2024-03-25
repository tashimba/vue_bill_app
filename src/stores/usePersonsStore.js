import { defineStore } from "pinia";


export const usePersonsStore = defineStore("persons", {
  state: () => {
    return {
      persons: [
        {
          name: "Person 1",
          id: 1,
          debts:[]
        },
        {
          name: "Person 2",
          id: 2,
          debts:[]
        },
        {
          name: "Person 3",
          id: 3,
          debts:[]
        },
      ],
      calculated: false
    };
  },

  actions: {
    addPerson(name) {
      const newPerson = {
        name: name,
        id: Date.now(),
      };
      this.persons.unshift(newPerson);
      this.calculated = false
    },
    deletePerson(id) {
      this.persons = this.persons.filter((el) => el.id !== id);
    },
    addDebt(id, money, owner) {
      this.persons.find((person) => person.id == id).debts.push({
        money,  
        owner
      })

    
    },
    // reloadDebts(){
    //   this.persons.map(person => {
        
        

    //     const owner = this.persons.find(el => el.debt?.owner == person.id)
    //     if (owner){
    //       if (owner.debt.owner == person.id){
    //         owner.debt.money = owner.debt.money - person.debt.money
    //         owner.debt = {
    //           money: this.money - person.debt.money,
    //           owner:
    //         }
    //         person.debt.money = person.debt.money - owner.debt.money  
    //       }
    //     }
        
    //   })
    
    // this.calculated = true
      
    // }
  },
});
