import { defineStore } from "pinia";

export const useProductStore = defineStore("store", {
  id: "products",
  state: () => ({
    products: [],
    editProductDetails: {},
  }),
  getters: {
    getProducts: (state) => state.products,
    getEditProduct: (state) => state.editProductDetails,
  },
  actions: {
    setProducts(apiProducts) {
      console.log(apiProducts, "products inside store");
      this.products = [...apiProducts];
    },

    editProduct(id) {
      const product = this.products.find((product) => product.id == id);
      console.log("Found Product", product);
      this.editProductDetails = product;
      console.log(this.editProductDetails, "prod details state");
    },

    deleteFromStore(id) {
      const Updatedproducts = this.products.filter((product) => product.id !== id);
      this.products = Updatedproducts
      console.log('Deleted in Store');
    },

    addToStore(newProduct) {  
      this.products.push(newProduct)
      console.log('Added in Store');
    },

    updateInStore(updateData){
      console.log('update calledin store');
    const index = this.products.findIndex(product => product.id === updateData.id);
    this.products[index]=updateData
    console.log({index});
    }

  },
});
