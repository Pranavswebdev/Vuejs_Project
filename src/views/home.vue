<script setup>
import { object } from "vue-types";
import { defineProps } from "vue";

import Card from "../components/Card.vue";
import { storeToRefs, mapActions } from "pinia";
import { onMounted } from "vue";
import { useProductStore } from "../stores/prodcuts";

const main = useProductStore();
const { products } = storeToRefs(main);
const { getProducts } = main;

onMounted(async () => {
  getProducts();
});
</script>

<template>
  <div class="cards" v-for="product in products">
    <Card :product="product" />
  </div>
</template>

<style>
.cards {
  margin: 5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
</style>
