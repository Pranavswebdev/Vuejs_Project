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
     
    getProductsApi() {
      if (this.products.length) {
        return this.products;
      } else {
        const colref = collection(db, "products");
        getDocs(colref).then((snapshot) => {
          let docs = [];
          snapshot.docs.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          console.log(snapshot);
         return this.products = docs; 
        });
      }
    },

    deleteProduct(id) {
      const docRef = doc(db, "products", id);
      deleteDoc(docRef);
    },
  },
});
