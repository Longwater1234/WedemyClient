<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <h3 class="cart-header">Checkout</h3>
  <el-alert type="warning" center effect="dark">
    <p style="font-family: sans-serif; font-weight: bold">
      This is SANDBOX (Dev) MODE of Braintree Payments. Please use any of these
      <a
        href="https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/"
        target="_blank"
        rel="noopener"
      >
        test credit-card numbers.
      </a>
      Real CC info will NOT work.
    </p>
  </el-alert>

  <el-alert type="error" v-if="payError.length" :title="payError" />

  <!-- START OF PAYMENT BOX -->
  <el-card class="main-view-checkout" :body-style="{ width: '80%' }">
    <div id="paymentContainer"></div>
    <div>
      <el-button
        @click="submitPayment"
        :disabled="!isReady"
        :loading="isProcessing"
        id="checkout-btn"
        class="btn purple"
      >
        PAY NOW ${{ totalPrice }}
      </el-button>
    </div>
  </el-card>

  <!-- order summary here  -->
  <div class="order-brief">
    <el-collapse v-model="activeName">
      <el-collapse-item :style="{ fontSize: '16px' }" :title="summaryTitle" name="1">
        <ul class="cartlist">
          <template v-for="course in cartItems" :key="course.id">
            <li class="carty">{{ course.title }}</li>
            <el-divider/>
          </template>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
  <!-- end of summary -->
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import CheckoutService from "@/service/CheckoutService";
import { ElMessage } from "element-plus";
import dropin, { type Dropin } from "braintree-web-drop-in";
import CartService from "@/service/CartService";
import type { Course } from "@/interfaces/wedemy";

import type { AxiosResponse } from "axios";
import { handleApiError } from "@/util/http_util";
import { useRouter } from "vue-router";
import type { PaymentObj } from "@/interfaces/custom";
import { useStudentStore } from "@/stores";

// SEE OFFICIAL DOCS:
// https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html#on-examples
const paymentInstance = ref<Dropin | undefined>();

const clientToken = ref("");
const activeName = ref("1");
const totalPrice = ref(0.0);

const isReady = ref(false);
const isLoading = ref(false);
const isProcessing = ref(false);
const cartItems = ref<Course[]>([]);
const payError = ref("");
const summaryTitle = ref("Order Summary (some of your items)");

const router = useRouter();
const store = useStudentStore();

function getClientToken() {
  CheckoutService.getToken()
    .then(res => (clientToken.value = res.data.clientToken))
    .then(() => initializePayment(clientToken.value))
    .catch(error => handleApiError(error));
}

//runs AFTER above^, getClientToken
function initializePayment(token: string) {
  dropin.create({
      authorization: token,
      container: "#paymentContainer",
      paypal: {
        /* OPTIONAL, this requires PayPal BUSINESS Account */
        flow: "checkout",
        amount: totalPrice.value,
        currency: "USD"
      }
    })
    .then(instance => {
      paymentInstance.value = instance;
      isReady.value = true;
    })
    .catch(error => console.error(error));
}

//PAY button onClick
function submitPayment() {
  if (!isReady.value) return;
  isProcessing.value = true;
  paymentInstance.value?.requestPaymentMethod()
    .then(payload => {
      //CREATE PAYMENT OBJECT for Server
      let obj: PaymentObj = {
        nonce: payload.nonce,
        paymentMethod: payload.type,
        totalAmount: totalPrice.value
      };
      return obj;
    })
    .then(obj => CheckoutService.pay(obj))
    .then(res => handleSuccessPay(res))
    .catch(err => handleApiError(err))
    .finally(() => (isProcessing.value = false));
}

function handleSuccessPay(res: AxiosResponse) {
  store.getCartCountServer();
  ElMessage.success(res.data.message);
  //redirect to MyLearning
  router.replace({ name: "MyLearning" });
}

function fetchCartItems() {
  CartService.getMinePaged(0)
    .then(res => (cartItems.value = res.data.content))
    .then(() => fetchMyTotalBill())
    .catch(err => handleApiError(err))
    .finally(() => (isLoading.value = false));
}

onMounted(() => {
  getClientToken();
  fetchCartItems();
});

onBeforeUnmount(() => {
  //clean up
  paymentInstance.value?.teardown();
});


async function fetchMyTotalBill() {
  const res = await CartService.getMyTotalBill();
  totalPrice.value = res.data.totalPrice;
}

</script>

<style scoped>
.main-view-checkout {
  text-align: center;
  display: flex;
  margin: 2em auto;
  flex-direction: row;
  width: 30vw;
  justify-content: center;
}

.carty {
  color: rgb(75, 75, 75);
  text-align: left;
  font-weight: 500;
  font-size: 16px;
}

#checkout-btn {
  width: 50% !important;
  text-align: center;
}

.order-brief {
  margin: 2em auto;
  display: flex;
  width: 30vw;
  flex-direction: column;
  justify-self: center;
}

@media screen and (max-width: 600px) {
  .main-view-checkout,
  .order-brief {
    width: 90vw;
  }

  .carty {
    font-size: 14px;
  }

  .cart-header {
    height: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
