<template>
  <!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->

  <h2 class="cart-header">About</h2>
  <div class="main-view" style="height: 70vh">
    <p>Clone of Udemy, PWA (progressive web app) built using Vue 3 + Typescript + Element Plus, and Pinia (no VueX).</p>

    <p>This App is also integrated with PayPal and CreditCard checkout (both powered by Braintree Payments).</p>
    <p>
      For Braintree Payments tutorials and samples, please see the official docs for JS. (Will require a backend server)
    </p>
    <p>The backend of this Demo is a Java Springboot application, with a MySQL database and Redis.</p>
    <p>See the footer for the GitHub repo.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
  setup() {
    document.title = "About | Wedemy";
    return {};
  }
});
</script>

<style scoped></style>
