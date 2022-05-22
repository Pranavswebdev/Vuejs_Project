<template>
  <nav>
    <router-link to="/">Home </router-link>
    <router-link to="/cart">Cart</router-link>
    <router-link  v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link  v-if="!isLoggedIn" to="/register">Register</router-link>
     <router-link  to="/admin">Admin</router-link>
    <Button id="signout" @click="handleSignout" v-if="isLoggedIn" danger
      >Sign out</Button
    >
  </nav>
  <notifications position="bottom right" classes="my-custom-class" />

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { Button } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { db } from "./Firebase/config";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "./router";
import Notifications from '@kyvg/vue3-notification'

const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  console.log(auth, "auth");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user, "user");
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignout = () => {
  signOut(auth).then(() => {
    router.push("/register");
  });
};
</script>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0px auto;
  padding: 2rem;
  text-align: center;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

nav {
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin-top: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#signout {
  position: fixed;
  top: 2rem;
  right: 2rem;
}
</style>
