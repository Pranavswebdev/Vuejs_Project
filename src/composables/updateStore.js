import { ref, watchEffect } from "vue";
import { db } from "../Firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useProductStore } from "../stores/prodcuts";

const updateStore = () => {

  const store = useProductStore();

  let colRef = collection(db, "products");
  onSnapshot(colRef, (snapshot) => {
    let docs = [];
    snapshot.docs.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });});
    store.setProducts(docs);

  });
};

export default updateStore;
