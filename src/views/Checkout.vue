<template>
  <h3 class="cart-header">Checkout</h3>
  <div class="main-view-checkout">
    <div style="width: 50%; border: 2px solid grey">
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
      <!-- order summary here  -->
      <div class="order-brief">
        <el-collapse v-model="activeName">
          <el-collapse-item
           :style="{fontSize: '16px'}"
           :title="`Order Summary`"
            name="1"
          >
            <div class="cartlist">
              <p class="carty" v-for="course in cartItems" :key="course.id">
                {{ course.title }}
                <el-divider></el-divider>
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- end of summary -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckoutService from "@/services/CheckoutService";
import { ElMessage } from "element-plus";
import dropin, { Dropin } from "braintree-web-drop-in";
import CartService from "@/services/CartService";
import { Course, PaymentObj } from "@/types";
import store from "@/store";

export default defineComponent({
  data() {
    let paymentInstance: Dropin | undefined;
    const cartItems = new Array<Course>();
    return {
      clientToken: "",
      paymentInstance,
      isReady: false,
      isLoading: false,
      isProcessing: false,
      cartItems,
    };
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
          //CREATE PAYMENT OBJECT for Server
          let obj: PaymentObj = {
            nonce: payload.nonce,
            paymentMethod: payload.type,
            totalAmount: this.totalPrice,
            courses: this.courseIdArray,
          };
          return obj;
        })
        .then((obj) => CheckoutService.pay(obj))
        .then((res) => this.handleSuccessPay(res))
        .catch((err) => this.handleFailedPay(err))
        .finally(() => (this.isProcessing = false));
    },
    handleSuccessPay(res: any) {
      store.getCartCountServer();
      ElMessage.success(res.data.message);
      //TODO REPLACE WITH DASHOBARD
      this.$router.replace("/");
    },
    handleFailedPay(err: any) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
    },
    fetchCartItems() {
      CartService.getAllMine()
        .then((res) => (this.cartItems = res.data))
        .catch((error) => ElMessage.error(error.message))
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    this.getClientToken();
    this.fetchCartItems();
  },
  beforeUnmount() {
    //clean up
    this.paymentInstance?.teardown();
  },
  computed: {
    totalPrice(): string {
      return this.cartItems
        .map((x) => x.price)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
    },
    courseIdArray(): number[] {
      return this.cartItems.map((c) => c.id);
    },
  },
});
</script>

<style scoped>
.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: black;
  color: white;
  margin-top: 0;
  top: 0;
  padding: 2% 10%;
}

.main-view-checkout {
  text-align: center;
  display: flex;
  margin: 0, 0;
  flex-direction: row;
  width: 80vw;
  justify-content: center;
}

.carty {
  color: rgb(75, 75, 75);
  text-align: left;
  font-weight: 500;
  font-size: 12px;
}

#checkout-btn {
  width: 80% important;
  text-align: center;
}
</style>