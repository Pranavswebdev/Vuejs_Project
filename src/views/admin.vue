<template>
  <Drawer @add="uploadData" />
  <a-table :columns="columns" :data-source="data">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>

    <template #action="{ record }">
      <a-button
        style="margin-right: 10px"
        @click="delProduct(record.id)"
        danger 
        >Delete</a-button
      >
      <a-button @click="editProduct(record.id)" type="primary">Edit</a-button>
      <!-- <Drawer :id="record.id" @add="uploadData" /> -->
    </template>
  </a-table>
</template>

<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { db } from "../Firebase/config";
import { addDoc, collection, getDoc, getDocs } from "@firebase/firestore";
import { defineComponent, onMounted, ref,onBeforeMount,onUpdated } from "vue";

import Drawer from "../components/Drawer.vue";
import { useProductStore } from "../stores/prodcuts";
import { storeToRefs, mapActions } from "pinia";

const store = useProductStore();

const { getProductsApi,deleteProduct,products,getProducts} = store;

const data = ref([]);

const uploadData = async (data) => {
  const colref = collection(db, "products");
  console.log(data, "inside admin");
  await addDoc(colref, {
    name: data.name,
    price: data.price,
    category: data.category,
    stock: data.stock,
    desc: data.description,
  });
};

const delProduct = (id) => {

  deleteProduct(id) 

};

const editProduct = (id) => {
  return id;
};

const columns = [
  {
    dataIndex: "name",
    key: "id",
    title: "Name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "id",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "id",
  },
  {
    title: "Description",
    key: "id",
    dataIndex: "desc",
  },
  {
    title: "Action",
    key: "id",
    slots: { customRender: "action" },
  },
];
 
export default defineComponent({ 

  setup() {

    getProductsApi()
    data.value =  store.getProducts
    console.log(getProducts,'getProducts'); 
    



    return {
      data,
      columns,
      uploadData,
      delProduct,
      editProduct,
 
    };
  },

  components: {
    SmileOutlined,
    DownOutlined,
    Drawer,
  },
});
</script>
