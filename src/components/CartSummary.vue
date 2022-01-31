<template>
  <el-affix :offset="10" class="fixed-baby">
    <el-card shadow="never" class="summary-card">
      <p>Total:</p>
      <div>
        <h2>${{ totalPrice }}</h2>
      </div>
      <div>
        <el-button id="checkout-btn" class="btn purple">
          Proceed to Checkout
        </el-button>
      </div>
      <el-row style="font-size: small">
        All Payments are secure and handled by Braintree Payments
      </el-row>
    </el-card>
  </el-affix>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartSummary",
  data() {
    return {
      cartPrice: 0.0,
    };
  },
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped>
.fixed-baby {
  width: max-content;
  text-align: start;
  top: 0;
}

.summary-card {
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#checkout-btn {
  width: 80% important;
  text-align: center;
}
</style>