<script setup >
import { object } from 'vue-types';
import { defineProps } from 'vue';

import Card from  '../components/Card.vue'
import { storeToRefs,mapActions } from 'pinia';
import {onMounted} from 'vue'
import {useProductStore} from '../stores/prodcuts'
// import getProductsApi from "../composables/productsApi";
// const {getProducts} = getProductsApi()
// getProducts()
const store =useProductStore();
const {products} = storeToRefs(store)

</script>
<template >

<div class="container">
  <h1 style="color:white" >Products</h1>
  <div class="row">
    
<div class="card" v-for="product in products" >
 <Card :product="product" />
</div>
  </div>
</div>





</template>

<style>
.row{
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.card {
  margin-top: 2rem;
  max-width: auto;

  margin-bottom: 2rem;
  border: 0;
  flex-basis: 33.333%;
  flex-grow: 0;
  flex-shrink: 0;
}





</style>