<template>
<notifications position="top right" classes="my-custom-class" />
  <!-- <Drawer :id="editId" :show="toggle" @add="uploadData" /> -->

  <a-button class="addbtn" type="primary" @click="addProductBtn">
    <PlusOutlined />
    Add New Product
  </a-button>
  <a-table :columns="columns" :data-source="products">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>

    <template #action="{ record }">
      <a-button style="margin-right: 10px" @click="delProduct(record.id)" danger
        >Delete</a-button
      >
      <a-button @click="editProduct(record.id)" type="primary">Edit</a-button>
    </template>
  </a-table>

  <a-drawer
    title="Create a new account"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <FormVue
      :editId="editId"
      :edit="edit"
      @close="onClose"
      @addProduct="uploadData"
      @update="update"
    />
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    ></div>
  </a-drawer>
</template>

<script>

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


import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { db } from "../Firebase/config";
import { addDoc, collection, getDoc, getDocs } from "@firebase/firestore";
import { defineComponent, onMounted, ref, onBeforeMount, onUpdated } from "vue";
import Drawer from "../components/Drawer.vue";
import getProductsApi from "../composables/productsApi";
import { storeToRefs, mapActions } from "pinia";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useProductStore } from "../stores/prodcuts";
import FormVue from "../components/Form.vue";
import { notify } from "@kyvg/vue3-notification";
import Notifications from '@kyvg/vue3-notification'
export default defineComponent({
  setup() {
    const store = useProductStore();
    const { products } = storeToRefs(store);
    const data = ref([]);
    const { getProducts, deleteProduct, addProduct, updateProduct } =
      getProductsApi();
    var editId = ref("");
    let edit = ref(true);
    getProducts();
    console.log(products, "products inside admin");
    const delProduct = (id) => {
      deleteProduct(id);
    };
    const editProduct = (id) => {
      editId.value = id;
      edit.value = true;
      showDrawer();
    };
    onUpdated(() => console.log(edit.value));

    const rules = {
      name: [{ required: true, message: "Please enter user name" }],
      price: [{ required: true, message: "Please select an price" }],
      category: [{ required: true, message: "Please choose the category" }],
      stock: [{ required: true, message: "Please choose the stock" }],
      description: [
        { required: true, message: "Please enter description" },
      ],
    };

    const uploadData = (productData) => {
      

      if (
        productData.name &&
        productData.price &&
        productData.stock &&
        productData.desc &&
        productData.category !== ""
      ) {

        addProduct(productData);
        console.log(productData, "product data in admin");
        onClose();
      } else {
        console.log(
          productData.name,
          productData.stock,
          "product data in admin"
        );
        alert("Please fill the form");
        return;
      }
    };

    const update = (updateData) => {
      updateProduct(updateData);
    };

    const visible = ref(false);
    const addProductBtn = () => {
      edit.value = false;
      showDrawer();
    };

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };



    return {
      data,
      columns,
      uploadData,
      delProduct,
      editProduct,
      editId,
      products,
      edit,
      rules,
      visible,
      showDrawer,
      onClose,
      addProductBtn,
      updateProduct,
      update,
    };
  },

  components: {
    SmileOutlined,
    DownOutlined,
    PlusOutlined,
    Drawer,
    FormVue,
     Notifications
  },
});
</script>

<style>
.addbtn {
  margin: 2rem;
}
</style>
