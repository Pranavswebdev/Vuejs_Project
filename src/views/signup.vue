<template>
  <div class="title">Create New Account</div>

  <div class="signup">
    <label for="email">Email</label>
    <input placeholder="Email" name="email" type="text" v-model="email" />
    <label for="pass">Password</label>
    <input
      placeholder="Password"
      name="pass"
      type="password"
      v-model="password"
    />

    <Button @click="register" type="primary">Sign Up</Button>
    <div @click="singInWithGoogle" class="google-btn">
      <div class="google-icon-wrapper">
        <img
          class="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p class="btn-text"><b>Sign in with google</b></p>
    </div>

    
  </div>
</template>

<script setup>
import { Button } from "ant-design-vue";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { db } from "../Firebase/config";

const email = ref("");
const password = ref("");
const router = useRouter();
const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log(data);
      console.log(auth.currentUser);
      alert("Successfully Registered");
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};

const singInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>




<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:500);
.title {
  height: auto;
  margin-top: 3rem;
  color: rgb(217, 217, 217);
  font-size: larger;
}

.signup {
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
}

.signup label {
  margin-top: 2rem;
  padding-bottom: 1rem;
}

.signup input {
  height: 2rem;
  border-radius: 10px;
  border: 0;
   color: black;
}

.signup button {
  background-color: rgb(16, 126, 222);
  font-size: 1rem;
  border-radius: 10px;
  width: 8rem;
  color: aliceblue;
  height: 30px;
  margin: auto;
  margin-top: 4rem;
  border: 0;
  cursor: pointer;
}

.google-btn {
  margin: auto;
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.google-icon-wrapper {
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: white;
}
.google-icon {
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 18px;
  height: 18px;
}
.btn-text {
  float: right;
  margin: 11px 11px 0 0;
  color: white;
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: "Roboto";
}

.btn-text:hover {
  box-shadow: 0 0 6px #4285f4;
}
.btn-text:active {
  background: #1669f2;
}
</style>
