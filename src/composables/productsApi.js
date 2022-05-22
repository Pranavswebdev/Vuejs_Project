import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "@firebase/firestore";
import { useProductStore } from "../stores/prodcuts";
import { db } from "../Firebase/config";
import { ref } from "vue";
import updateStore from "./updateStore";
import async from "hbs/lib/async";

const store = useProductStore();

const getProductsApi = () => {
  const products = ref([]);

  const getProducts = () => {
    if (store.getProducts.length) {
      console.log(products.value, "if length>0");
      products.value = store.getProducts;
    } else {
      try {
        const colref = collection(db, "products");
        getDocs(colref).then((snapshot) => {
          let docs = [];
          snapshot.docs.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          store.setProducts(docs);
          products.value = store.getProducts;
          console.log(docs, "docs");
          // updateStore();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const docRef = doc(db, "products", id);
      deleteDoc(docRef).then((res) => {
        store.deleteFromStore(id);
        alert("Product Deleted");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (data) => {
    try {
      const colref = collection(db, "products");
      await addDoc(colref, data).then((res) => {
        data.id = res.id;
        store.addToStore(data);
        console.log("product added", res.id);
        alert("Product Added");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (updateData) => {
    try {
      const docRef = doc(db, "products", updateData.id);
      updateDoc(docRef, updateData).then((res) => {
        store.updateInStore(updateData);
        alert("Product Updated");
        console.log(updateData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { getProducts, products, deleteProduct, addProduct, updateProduct };
};

export default getProductsApi;
