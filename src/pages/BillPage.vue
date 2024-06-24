<template>
  <h1>Счет</h1>
  <v-card class="mx-auto" max-width="500">
    <v-list class="py-0">
      <transition-group name="list">
        <v-list-group
          v-for="(item, i) in billStore.items"
          :key="item.id"
          :value="item"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :style="i != 0 && 'border-top: 1px solid rgba(0, 0, 0, 0.2)'"
            >
              <v-card
                class="py-0"
                variant="text"
                :title="item.name"
                :subtitle="`Цена: ${getStringPrice(item.price)}`"
              >
                <template v-slot:append>
                  <div class="d-flex ga-5">
                    <v-btn
                      v-if="!!item"
                      density="comfortable"
                      variant="outlined"
                    >
                      <v-icon icon="mdi-pencil"></v-icon>
                      <BaseDialog :item="item" />
                    </v-btn>

                    <v-btn
                      density="comfortable"
                      variant="outlined"
                      @click.stop="billStore.deleteItem(item.id)"
                    >
                      <v-icon icon="mdi-delete"></v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-card>
            </v-list-item>
          </template>

          <SelectPersons :ItemId="item.id" />
        </v-list-group>
      </transition-group>
    </v-list>
  </v-card>

  <div class="text-center pa-4">
    <v-btn
      width="500"
      size="large"
      variant="tonal"
      elevation="2"
      @click="openState = true"
    >
      Добавить позицию
      <BaseDialog></BaseDialog>
    </v-btn>
  </div>
</template>

<script setup>
import BaseDialog from "../components/BaseDialog.vue";
import SelectPersons from "../components/SelectPersons.vue";
import { useBillStore } from "../stores/useBillStore.js";
import { getStringPrice } from "../functions/getStringPrice";

const billStore = useBillStore();
</script>
<style lang="scss"></style>
