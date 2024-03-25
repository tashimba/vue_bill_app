import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", {
  state: () => {
    return {
      persons: [
        {
          name: "Person 1",
          id: 1,
        },
        {
          name: "Person 2",
          id: 2,
        },
        {
          name: "Person 3",
          id: 3,
        },
      ],
    };
  },

  actions: {
    addPerson(name) {
      const newPerson = {
        name: name,
        id: Date.now(),
      };
      this.persons.unshift(newPerson);
    },
    deletePerson(id) {
      this.persons = this.persons.filter((el) => el.id !== id);
    },
    addDebt(name, debt) {
      this.persons.find((person) => person.name == name).debt = debt;
    },
  },
});
