import { defineStore } from "pinia";
import { db } from "../Firebase/config";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
} from "@firebase/firestore";
export const useProductStore = defineStore("store", {
  id: "products",
  state: () => ({
    products: [],
  }),
  getters: {
    getProducts: (state) => state.products,
  },
  actions: {
    setProducts(apiProducts) {
      console.log(apiProducts, "products inside store");

      this.products = [...apiProducts];
    },
 
 
  },
});
