<template>
  <h3 class="cart-header">Checkout</h3>
  <div class="main-view">
    <div style="width: 60%; border: 1px solid black">
      <div id="paymentContainer"></div>
      <div>
        <el-button @click="submitPayment" :disabled="true" type="success" class="btn purple">
          Pay USD 10
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckoutService from "@/services/CheckoutService";
import { ElMessage } from "element-plus";
import dropin, { Dropin } from "braintree-web-drop-in";

export default defineComponent({
  data() {
    let paymentInstance: Dropin | undefined;
    return {
      clientToken: "",
      paymentInstance,
      isReady: false
    };
  },
  methods: {
    getClientToken() {
      CheckoutService.getToken()
        .then((res) => (this.clientToken = res.data.clientToken))
        .then(() => this.initializePayment(this.clientToken))
        .catch((error) => ElMessage.error(error.message));
    },
    initializePayment(token: string) {
      const self = this;
      dropin.create({
          authorization: token,
          container: "#paymentContainer",
          paypal: {
            flow: "checkout",
            amount: "10.00",
            currency: "USD",
          },
        })
        .then((instance) => {
          self.paymentInstance = instance;
          self.isReady = true;
        })
        .catch((error) => console.error(error));
    },
    submitPayment() {
      let self = this;
      if (!self.isReady) return;

      this.paymentInstance?.requestPaymentMethod().then((payload) => {
       // here submit everything to Server 
       //payload.nonce, amount
      });
    },
  },
  mounted() {
  //  this.getClientToken();
  },
  beforeUnmount() {
    this.paymentInstance
      ?.teardown()
      .then(() => console.log("torn down"))
      .catch((err) => console.error(err));
  },
});
</script>

<style>
.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: black;
  color: white;
  margin-top: 0;
  top: 0;
  padding: 2% 10%;
}

.main-view {
  text-align: center;
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
}
</style>