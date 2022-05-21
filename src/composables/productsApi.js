import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { useProductStore } from "../stores/prodcuts";
import { db } from "../Firebase/config";
import { ref } from "vue";
import updateStore from "./updateStore";

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
    const docRef = doc(db, "products", id);
    deleteDoc(docRef).then((res) => {
      store.deleteFromStore(id)
    });
  };

  const addProduct = async (data) => {
    const colref = collection(db, "products");
    await addDoc(colref, data).then((res)=>{

      store.addToStore(data)
      console.log('product added',res.id);

    })

  };

  return { getProducts, products, deleteProduct,addProduct };
};

export default getProductsApi;
