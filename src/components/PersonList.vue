<template>  
        <v-responsive
            class="mx-auto"
            max-width="400"
            >
        <v-text-field
            v-model="inputValue"
            label="Name"
            ></v-text-field>
                <v-btn  @click="addPerson">Добавить</v-btn> 
        </v-responsive>
        <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-list
        :items="persons"
        item-title="name"
        item-value="id"
      ></v-list>
    </v-card>

    
</template>

<script>
  export default {
    data: () => ({
      persons: [
        {
          name: 'Person 1',
          id: 1,
        },
        {
          name: 'Person 2',
          id: 2,
        },
        {
          name: 'Person 3',
          id: 3,
        },
      ],
      inputValue:""
    }
    ),
    methods:{

        addPerson(){
            const newPerson = {
                name: this.inputValue,
                id: Date.now()
            }
            this.persons.unshift(newPerson)
            this.inputValue = ''
        }
    }
  }
</script>
<style lang="">
    
</style>