<template>
  <h3 class="cart-header">Your Cart ({{ store.getters.getCartCount }})</h3>

  <div class="main-view">
    <!-- if nothing in cart -->
    <div v-if="!store.getters.getCartCount" class="cart-view">
      <el-empty description="Your cart is empty :("></el-empty>

      <router-link to="/">
        <el-button plain class="btn purple" style="width: 15em">
          Keep shopping
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Cart",
  data() {
    document.title = "Cart | Wedemy";
    return {};
  },
  inject: ["store"],
});
</script>

<style>
.main-view {
  text-align: center;
  justify-content: center;
}

.main-view {
  padding: 0 10% 0 10%;
}

.cart-view {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: black;
  color: white;
  margin-top: 0;
  top: 0;
  padding: 2% 10%;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2% 0 2%;
  }
  .cart-header {
    padding: 5% 10%;
  }
}
</style>