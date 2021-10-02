<template>
  <div class="wrapper">
    <p class="cart-header main-view">Your cart ({{store.getters.getCartCount}})</p>

    <div class="main-view top-margin">

      <!-- if nothing in cart -->
      <div v-if="store.getters.getCartCount === 0" class="cart-view">
        <div>Your cart is empty. Go and explore</div>

        <router-link to="/">
          <button class="btn btn-auto btn-accent" style="color: white">
            Keep shopping
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import store from "../store"

export default defineComponent({
  data() {
    return {
    };
  },
  inject: ["store"]
});
</script>

<style>
.cart-header {
  background-color: var(--dark);
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  font-size: 24px;
  color: white;
}
.cart-view {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}
</style>