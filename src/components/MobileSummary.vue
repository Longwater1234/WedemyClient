<template>
  <!-- SHOWS ONLY ON MOBILE VIEW -->
  <div class="mobile-only">
    <el-card shadow="never" class="m-card">
      <p>Accepting all major credit cards and PayPal.</p>
      <h2>Total: ${{ totalPrice }}</h2>
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

<script lang="ts">
import { defineComponent } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";

export default defineComponent({
  name: "MobileSummary",
  data() {
    return {};
  },
  props: {
    totalPrice: {
      type: String,
      default: "0.0",
    },
  },
  components: {
    ArrowRight,
  },
});
</script>

<style scoped>
.m-card {
  width: 96vw;
  font-size: small;
  margin-bottom: 1em;
}
</style>
