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
      const currentPerson = this.persons.find((person) => person.id == id)
      const currentPersonDebtsOwner =  this.persons.find((person) => person.id == owner)

      //если currentPerson уже должен этому же owner
      if (currentPerson.debts.some(debt => debt.owner == owner)){
        currentPerson.debts.map(debt => {
          if (debt.owner === owner){
            return debt.money+=money
          }
        })
      }
     else{
      this.persons.find((person) => person.id == id).debts.push({
        money,  
        owner
      })
    }

    //если друг другу должны
    if (currentPersonDebtsOwner.debts.find(debt => debt.owner === id)){
      currentPersonDebtsOwner.debts.map(debt => {
        if (debt.owner === id){
          debt.money-=money
          if (debt.money === 0){
            currentPersonDebtsOwner.debts = currentPersonDebtsOwner.debts.filter(el => el.owner !== id)
          }
        }
      })      
      currentPerson.debts.map(debt => {
        if (debt.owner === currentPersonDebtsOwner.id) {
          debt.money-=money
          if (debt.money === 0){
            currentPerson.debts = currentPerson.debts.filter(el => el.owner !== currentPersonDebtsOwner.id)
          }
        }
      })  
    }

    },
  },
});
