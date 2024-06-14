import { defineStore } from "pinia";
import { useBillStore } from "./useBillStore";

export const usePersonsStore = defineStore("persons", {
  state: () => {
    return {
      persons: [],
    };
  },

  actions: {
    addPerson(name) {
      const newPerson = {
        name: name,
        id: Date.now(),
        debts: [],
      };
      this.persons.unshift(newPerson);
    },
    deletePerson(id) {
      const billStore = useBillStore();
      this.persons = this.persons.filter((el) => el.id !== id);

      this.persons.map(
        (person) =>
          (person.debts = person.debts.filter((debt) => debt.owner !== id))
      );

      billStore.deletePersonFromUsing(id);
      billStore.getResult();
    },
    deleteDebts() {
      this.persons.forEach((el) => (el.debts = []));
    },

    addDebt(id, money, owner) {
      const currentPerson = this.persons.find((person) => person.id == id);
      const currentPersonDebtsOwner = this.persons.find(
        (person) => person.id == owner
      );

      //если currentPerson уже должен этому же owner
      if (currentPerson.debts.some((debt) => debt.owner == owner)) {
        currentPerson.debts.map((debt) => {
          if (debt.owner === owner) {
            debt.money += money;
          }
        });
      } else {
        this.persons
          .find((person) => person.id == id)
          .debts.push({
            money,
            owner,
          });
      }

      //если друг другу должны
      if (currentPersonDebtsOwner.debts.find((debt) => debt.owner === id)) {
        let moneyDiff = 0;
        currentPersonDebtsOwner.debts.map((debt) => {
          if (debt.owner === id) {
            moneyDiff = debt.money - money;
            if (moneyDiff > 0) debt.money = moneyDiff;
            else debt.money = 0;
            if (debt.money === 0) {
              currentPersonDebtsOwner.debts =
                currentPersonDebtsOwner.debts.filter((el) => el.owner !== id);
            }
          }
        });
        currentPerson.debts.map((debt) => {
          if (debt.owner === currentPersonDebtsOwner.id) {
            if (moneyDiff < 0) debt.money = Math.abs(moneyDiff);
            else debt.money -= money;
            if (debt.money === 0) {
              currentPerson.debts = currentPerson.debts.filter(
                (el) => el.owner !== currentPersonDebtsOwner.id
              );
            }
          }
        });
      }
    },
  },

  getters: {
    hasAnyDebts: (state) => () => {
      return state.persons.find((person) => person.debts.length);
    },
    getPersonsWithDebts: (state) => () => {
      return state.persons.filter((person) => person.debts.length);
    },
  },
});
