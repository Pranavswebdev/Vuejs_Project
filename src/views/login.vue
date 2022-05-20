<template>
  <div class="title">
  Login
  </div>

  <div class="login">
    <label for="email">Email</label>
    <input placeholder="Email" name="email" type="text" v-model="email" />
    <label for="pass">Password</label>
    <input
      placeholder="Password"
      name="pass"
      type="password"
      v-model="password"
    />
    <p class="error" v-if="errMsg" >{{errMsg}}</p>

    <Button  @click="register" type="primary">Login</Button>
     <div @click="singInWithGoogle" class="google-btn">
      <div class="google-icon-wrapper">
        <img
          class="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p class="btn-text"><b>Sign in with google</b></p>
    </div>

    <!-- <Button @click="singInWithGoogle" type="primary">Sign In With Gmail</Button> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import { db } from "../Firebase/config";
import {Button} from 'ant-design-vue';

const email = ref("");
const password = ref("");
const errMsg=ref('');
const router = useRouter();
const register = () => {
  const auth = getAuth()
 signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log(data);
      console.log(auth.currentUser);
      alert("Successfully Registered");
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
      const error = err.message
      errMsg.value=error.substring( error.lastIndexOf("/") + 1, 
    error.lastIndexOf(")"))
    });
};

const singInWithGoogle=()=>{

const provider = new GoogleAuthProvider();
signInWithPopup(getAuth(),provider)
.then((result)=>{

console.log(result.user);
router.push('/')

})

.catch((error)=>{

console.log(error);

})


}
</script>

<style scoped >
.title {
  height: auto;
  margin-top: 3rem;
  color: rgb(217, 217, 217);
  font-size: larger;
}

.login {
  display: flex;
  max-width: 280px;
  height: 400px;
  margin: 0 auto;
  background-color: rgb(55, 55, 55);
  flex-direction: column;
  padding: 2rem;
  box-sizing: content-box;
  text-align: start;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  color: rgb(222, 222, 222);
}

.login label {
  margin-top: 1rem;
  padding-bottom: 1rem;
}

.login input {

  border-radius: 10px;
  height: 2rem;
  color: black;
}

.login button {
  background-color: rgb(16, 126, 222);
  font-size: 1rem;
  border-radius: 5px;
  width: auto;
  color: aliceblue;
  height: 30px;
  margin: auto;

 border: 0;
}
.error{

   color: rgb(234, 90, 90); 
}
</style>
