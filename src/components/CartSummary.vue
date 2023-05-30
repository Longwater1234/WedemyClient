<template>
  <el-affix :offset="10" class="fixed-baby">
    <el-card shadow="never" class="summary-card">
      <p>Total:</p>
      <div>
        <h2>${{ totalPrice }}</h2>
      </div>
      <div>
        <router-link to="/checkout">
          <el-button id="checkout-btn" class="btn purple">
            Proceed to Checkout <arrow-right style="width: 1em" />
          </el-button>
        </router-link>
      </div>
      <div class="footnote">
        <p>Accepting all major credit cards and PayPal.</p>
      </div>
    </el-card>
  </el-affix>
</template>

<script lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartSummary",
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

.footnote {
  font-size: small;
  text-align: center;
}

#checkout-btn {
  width: 80% !important;
  text-align: center;
}
</style>
