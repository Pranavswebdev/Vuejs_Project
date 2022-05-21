<template>
  <!-- <Drawer :id="editId" :show="toggle" @add="uploadData" /> -->

  <a-button class="addbtn" type="primary" @click="showDrawer">
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
      <!-- <Drawer :id="record.id" @add="uploadData" /> -->
    </template>
  </a-table>

  <a-drawer
    title="Create a new account"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Product Name" name="name">
            <a-input
              v-model:value="form.name"
              placeholder="Please enter product name"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Price" name="price">
            <a-input
              type="number"
              v-model:value="form.price"
              placeholder="Please enter product price"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Category" name="category">
            <a-input
              type="text"
              v-model:value="form.category"
              placeholder="Please enter productcategory"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Stock" name="stock">
            <a-input
              type="number"
              v-model:value="form.stock"
              placeholder="Please enter product Stock"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="form.description"
              :rows="4"
              placeholder="please enter url description"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

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
    >
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="uploadData">Submit</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { db } from "../Firebase/config";
import { addDoc, collection, getDoc, getDocs } from "@firebase/firestore";
import { defineComponent, onMounted, ref, onBeforeMount, onUpdated } from "vue";
import Drawer from "../components/Drawer.vue";
import getProductsApi from "../composables/productsApi";
import updateStore from "../composables/updateStore";
import { storeToRefs, mapActions } from "pinia";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useProductStore } from "../stores/prodcuts";

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
    const store = useProductStore();
    const { delet } = store;
    const { products } = storeToRefs(store);
    const data = ref([]);
    const { getProducts, deleteProduct, addProduct } = getProductsApi();
    var editId = ref("");
    var toggle = ref(false);
    getProducts();
    console.log(products, "products inside admin");

    const delProduct = (id) => {
      deleteProduct(id);
    };

    const editProduct = (id) => {
      editId.value = id;
      toggle.value = !toggle.value;
      console.log(editId.value);
      store.editProduct(id);
    };
    const form = ref({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    });

    const rules = {
      name: [{ required: true, message: "Please enter user name" }],
      price: [{ required: true, message: "Please select an price" }],
      category: [{ required: true, message: "Please choose the " }],
      stock: [{ required: true, message: "Please choose the stock" }],
      description: [
        { required: true, message: "Please enter url description" },
      ],
    };
    const productData=ref({})
    const uploadData = async () => {
        productData.value = {
        name:form.value.name,
        price:form.value.price,
        category:form.value.category,
        stock:form.value.stock,
        desc:form.value.description,
      
      };
      addProduct(productData.value)
      console.log(productData.value);

    //  form.value.category = "";
    //   form.value.description = "";
    //   form.value.name = "";
    //   form.value.price = "";
    //   form.value.stock = "";

      onClose();
    };

    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };

    const upload = () => {
      context.emit("add", form.value);
      console.log(form.value);
      form.value.category = "";
      form.value.description = "";
      form.value.name = "";
      form.value.price = "";
      form.value.stock = "";
    };
    return {
      data,
      columns,
      uploadData,
      delProduct,
      editProduct,
      editId,
      products,
      toggle,
      form,
      rules,
      visible,
      showDrawer,
      onClose,
      upload,
    };
  },

  components: {
    SmileOutlined,
    DownOutlined,
    PlusOutlined,
    Drawer,
  },
});
</script>

<style>
.addbtn {
  margin: 2rem;
}
</style>
