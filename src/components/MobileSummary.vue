<template>
  <!-- SHOWS ONLY ON MOBILE VIEW -->
  <div class="mobile-only">
    <el-card shadow="never" class="m-card">
      <p>Accepting all major credit cards and PayPal.</p>
      <h2>Total: ${{ props.totalPrice }}</h2>
      <div>
        <router-link to="/checkout">
          <el-button id="checkout-btn" class="btn purple">
            Proceed to Checkout <arrow-right style="width: 1em" />
          </el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  }
});
</script>

<style scoped>
.m-card {
  width: 100vw;
  font-size: small;
  margin-bottom: 1em;
}
</style>
