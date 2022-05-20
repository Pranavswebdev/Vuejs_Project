<template>
  <a-button class="addbtn" type="primary" @click="showDrawer">
    <PlusOutlined />
 Add New Product
  </a-button>
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
            <a-input v-model:value="form.name" placeholder="Please enter product name" />
          </a-form-item>
        </a-col>
     
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Price" name="price">
          <a-input type="number" v-model:value="form.price" placeholder="Please enter product price" />
          </a-form-item>
        </a-col>
         </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Category" name="category">
          <a-input type="text" v-model:value="form.category" placeholder="Please enter productcategory" />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="Category" name="Category">
            <a-select placeholder="Please choose the Category" v-model:value="form.Category">
              <a-select-option value="private">Private</a-select-option>
              <a-select-option value="public">Public</a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Stock" name="stock">
           <a-input type="number" v-model:value="form.stock" placeholder="Please enter product Stock" />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="DateTime" name="dateTime">
            <a-date-picker
              v-model:value="form.dateTime"
              style="width: 100%"
              :get-popup-container="trigger => trigger.parentNode"
            />
          </a-form-item>
        </a-col> -->
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
      <Uploader/>
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
      <a-button type="primary" @click="upload">Submit</a-button>
    </div>
  </a-drawer>
</template>
<script >
import { PlusOutlined } from '@ant-design/icons-vue';
import {db} from '../Firebase/config'
import { doc, getDoc } from "firebase/firestore";
import { defineComponent, reactive, ref,onMounted,watch,watchEffect } from 'vue';
import Uploader from './Uploader.vue'
import {useProductStore} from '../stores/prodcuts'
import {  storeToRefs } from 'pinia';

export default defineComponent({

    props:['id','show'],

  components: {
    PlusOutlined,
    Uploader
  },


setup(props,context) {

const store = useProductStore()
const{editProductDetailst} = storeToRefs(store)
console.log(editProductDetailst,"edit details");

console.log(props.id,props.show,'propppsss');
    
    const form = ref({
      name: props.id,
      price: '',
      category: '',
      stock: '',
      description: '',
    });
   
    const rules = {
      name: [{ required: true, message: 'Please enter user name' }],
      price: [{ required: true, message: 'Please select an price' }],
      category: [{ required: true, message: 'Please choose the ' }],
      stock: [{ required: true, message: 'Please choose the stock' }],
      description: [{ required: true, message: 'Please enter url description' }],
    };

    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };

  watch(props.show,()=>{
      console.log('watch called');
        showDrawer()
    })

    watchEffect(()=>{

    const editProduct=editProductDetailst
    console.log('watch called');
        showDrawer()


    })


    const upload=()=>{

        context.emit('add',form.value)
        console.log(form.value);
        form.value.category=''
        form.value.description=''
        form.value.name=''
        form.value.price=''
        form.value.stock=''

       onClose()
        

    }
    // onMounted(async()=>{

    // const docRef = doc(db, "id", props.id);
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.data(),"DocSnap");


    // })

    return {
      form,
      rules,
      visible,
      showDrawer,
      onClose,
      upload,
      editProductDetailst
      
    };
  },
});
</script>

<style>

.addbtn{

margin: 2rem;


}
</style>