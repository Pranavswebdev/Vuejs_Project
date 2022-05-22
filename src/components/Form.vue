<template>
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
            v-model:value="form.desc"
            :rows="4"
            placeholder="please enter url description"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
    <a-button v-if="!edit" type="primary" @click="addProduct">Submit</a-button>
    <a-button v-if="edit" type="primary" @click="updateProduct"
      >Update</a-button
    >
  </a-form>
</template>

<script>
import {
  ref,
  watch,
  watchEffect,
  computed,
  onUpdated,
  toRefs,
  toRef,
  toRaw,
  onMounted,
  onUnmounted,
} from "vue";
import { fromType } from "vue-types";
import { useProductStore } from "../stores/prodcuts";

export default {
  props: ["editId", "edit"],

  setup(props, context) {

    onUpdated(() => {
      console.log(props.edit, props.editId);

      if (props.edit) {
        form.value = {
          name: props.edit ? editProduct.name : " ",
          price: props.edit ? editProduct.price : "",
          category: props.edit ? editProduct.category : "",
          stock: props.edit ? editProduct.stock : "",
          desc: props.edit ? editProduct.desc : "",
        };
      } else {
        form.value = {
          name: "",
          price: "",
          category: "",
          stock: "",
          desc: "",
        };
      }
    });

    onUnmounted(() => {
      form.value = {
        name: "",
        price: "",
        category: "",
        stock: "",
        desc: "",
      };
      props.edit = false;
    });

    const store = useProductStore();
    console.log(props, "propss");
    watch(props.edit, () => {
      console.log("edit called");
    });

    var editProduct = store.products.find(
      (product) => product.id == props.editId
    );
    console.log("edit product ", editProduct);
    onUpdated(() => {
      editProduct = store.products.find(
        (product) => product.id == props.editId
      );
    });

    watch(props.edit, () => console.log("edit inside watch", props.edit));

    const form = ref({
      name: editProduct ? editProduct.name : "",
      price: editProduct ? editProduct.price : "",
      category: editProduct ? editProduct.category : "",
      stock: editProduct ? editProduct.stock : "",
      desc: editProduct ? editProduct.desc : "",
    });

    const addProduct = () => {
      console.log(form.value, "form values");
      context.emit("addProduct", form.value);
      form.value = {
        name: "",
        price: "",
        category: "",
        stock: "",
        desc: "",
      };
    };

    const updateProduct = () => {
      form.value.id = props.editId;
      console.log(form.value, "update details");
      context.emit("update", form.value);
      context.emit("close");
    };
    const onClose = () => {
      context.emit("close");
    };

    return { form, addProduct, onClose, props, updateProduct };
  },
};
</script>

<style lang="scss" scoped></style>
