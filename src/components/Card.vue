<template>
    <a-card hoverable class="card">
    <template #cover>
      <img
        alt="example"
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZSUyMHNob2V8ZW58MHx8MHx8&w=1000&q=80"
        width="100"
        height="150"
      />
    </template>
    <template class="ant-card-actions" #actions>
     <ShoppingCartOutlined key="cart" />
       <h5>BUY NOW</h5>
    <HeartOutlined />
  
    </template>
    <a-card-meta :title="product?.name" :description="'Rs' +product.price">
      <template #avatar>
  
      </template>
    </a-card-meta>
  </a-card>
</template>

<script >
import {ShoppingCartOutlined,HeartOutlined } from '@ant-design/icons-vue';
import {defineProps,computed} from 'vue'
import { object, string } from 'vue-types';

export default {

components:{ShoppingCartOutlined,HeartOutlined},
props:['product'],
setup(props){
console.log(props.product.name);
return props
}

}


</script>

<style scoped>
.card{

width: 250px;
height: 250px;
background-color: aliceblue;
color: aliceblue;
}
</style>