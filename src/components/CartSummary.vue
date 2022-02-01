<template>
  <el-affix :offset="10" class="fixed-baby">
    <el-card shadow="never" class="summary-card">
      <p>Total:</p>
      <div>
        <h2>${{ totalPrice }}</h2>
      </div>
      <div id="paymentContainer"></div>
      <div>
        <el-button
          @click="submitPayment"
          :disabled="!isReady"
          :loading="isProcessing"
          id="checkout-btn"
          class="btn purple"
        >
          Complete Payment
        </el-button>
      </div>
      <div class="footnote">
        <p>Payments are securely handled by Braintree (a PayPal Service)</p>
      </div>
    </el-card>
  </el-affix>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dropin, { Dropin } from "braintree-web-drop-in";
import CheckoutService from "@/services/CheckoutService";
import { ElMessage } from "element-plus";
import {PaymentObj, Course} from "@/types"

export default defineComponent({
  name: "CartSummary",
  data() {
    let paymentInstance: Dropin | undefined;
    return {
      clientToken: "",
      paymentInstance,
      isReady: false,
      isProcessing: false,
    };
  },
  props: {
    totalPrice: {
      type: String,
      default: 0,
    },
    courseArray: {
      type: Array,
      default: [],
    },
  },
  methods: {
    getClientToken() {
      CheckoutService.getToken()
        .then((res) => (this.clientToken = res.data.clientToken))
        .then(() => this.initializePayment(this.clientToken))
        .catch((error) => ElMessage.error(error.message));
    },
    //automatic onLoad
    initializePayment(token: string) {
      const self = this;
      dropin.create({
          authorization: token,
          container: "#paymentContainer",
          paypal: {
            flow: "checkout",
            amount: self.totalPrice,
            currency: "USD",
          },
        })
        .then((instance: any) => {
          self.paymentInstance = instance;
          self.isReady = true;
        })
        .catch((error) => console.error(error));
    },
    //on button click
    submitPayment() {
      let self = this;
      if (!self.isReady) return;
      this.isProcessing = true;
      this.paymentInstance?.requestPaymentMethod()
        .then((payload) => {
          // here submit everything to Server   
          let obj : PaymentObj = {
            nonce: payload.nonce,
            paymentMethod: String(payload.type).toUpperCase(),
            totalAmount: this.totalPrice,
            courses: this.courseArray,
          };
          return obj;
        })
        .then((obj) => this.processPayment(obj))
        .catch((err) => ElMessage.error(err.message));
    },
    processPayment(obj: PaymentObj) {
      CheckoutService.pay(obj)
        .then((res) => this.$router.push("/"))
        .catch((error) => ElMessage.error(error.response.data.message))
        .finally(() => (this.isProcessing = false));
    },
  },
  mounted() {
    this.getClientToken();
  },
  beforeUnmount() {
    //clear out Braintree
    this.paymentInstance?.teardown();
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
  width: 80% important;
  text-align: center;
}
</style>