import { addDoc, collection, getDoc, getDocs } from "@firebase/firestore";
import { useProductStore } from "../stores/prodcuts";
import { db } from "../Firebase/config";
import {ref} from 'vue'

const store = useProductStore();

const getProductsApi = () => {

  const products=ref([])
  
  const getProducts = () => {
    if (store.getProducts.length) {
      console.log(products.value,'if length>0');
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
          products.value=store.getProducts;
          console.log(docs,'docs');
        });
        
      } catch (error) {
        
        console.log(error);
      }
     
    }
  }


  const  deleteProduct=(id)=> {

    const docRef = doc(db, "products", id);
    deleteDoc(docRef);

  }

  return { getProducts,products };
};

export default getProductsApi