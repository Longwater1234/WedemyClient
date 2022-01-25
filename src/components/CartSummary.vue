<template>
  <el-affix :offset="10" class="fixed-baby">
    <el-card shadow="never" class="summary-card">
      <p>Total:</p>
      <div>
        <h2>${{ totalPrice }}</h2>
      </div>
      <div>
        <el-button id="checkout-btn" class="btn purple"> Checkout </el-button>
      </div>
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
  methods: {
    name() {},
  },
  computed: {
    name() {
      // return this.data
    },
  },
  props: {
      totalPrice: {
          type: Number,
          default: 0
      },
  },
});
</script>

<style>
.fixed-baby {
  width: 300px;
  margin-right: 350px;
  margin-bottom: 300px;
  float: right;
  text-align: start;
}

.summary-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#checkout-btn{
    width: 80% important;
    text-align: center;
}
</style>