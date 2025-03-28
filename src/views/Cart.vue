<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <h3 class="cart-header">My Cart ({{ totalElements }})</h3>

  <div class="cart-content" v-loading="store.getIsLoggedIn && isLoading">
    <div class="main-view" :class="{ wider: cartItems.length === 0 }">
      <!-- if nothing in cart -->
      <div v-if="!store.getCartCount" class="empty-view">
        <el-empty description="Your cart is empty :("></el-empty>

        <router-link to="/">
          <el-button plain class="btn purple" style="width: 15em"> Keep shopping </el-button>
        </router-link>
      </div>

      <!-- otherwise show list of Cart items -->
      <div v-else>
        <mobile-summary :totalPrice="totalPrice"></mobile-summary>

        <el-row v-for="course in cartItems" :key="course.id">
          <el-space size="large" direction="vertical">
            <el-card class="w-card" shadow="hover">
              <router-link :to="{ name: 'Course', params: { id: course.id } }">
                <el-row>
                  <el-col :span="8">
                    <img :src="course.thumbUrl" alt="Thumbnail" class="w-thumb" />
                  </el-col>
                  <el-col :span="14" class="txt-block">
                    <div class="w-title">{{ course.title }}</div>
                    <div class="noblue">{{ course.author }}</div>
                    <div class="noblue">${{ course.price }}</div>
                  </el-col>
                </el-row>
              </router-link>
              <el-icon class="w-delete" @click="removeCart(course.id)"><delete-filled /> <span>Remove</span> </el-icon>
            </el-card>
          </el-space>
        </el-row>

        <!-- PAGINATION -->
        <el-pagination
          layout="prev, pager, next"
          :total="totalElements"
          :page-size="5"
          v-model:current-page="currentPage"
        />
      </div>
    </div>
    <!-- END OF CARD LIST -->

    <!-- floaty card on right -->
    <div class="floaty" v-if="cartItems.length">
      <cart-summary :totalPrice="totalPrice"></cart-summary>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { DeleteFilled } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import CartService from "@/service/CartService";
import CartSummary from "@/components/CartSummary.vue";
import MobileSummary from "@/components/MobileSummary.vue";
import { useStudentStore } from "@/stores";
import type { Course } from "@/interfaces/wedemy";
import { handleApiError } from "@/util/http_util";

const store = useStudentStore();
const cartItems = ref<Course[]>([]);
const isLoading = ref(true);
const totalElements = ref(0); //pagination
const currentPage = ref(1); // pagination
const totalPrice = ref(0.0);

function fetchCartItems(page: number) {
  CartService.getMinePaged(page)
    .then(res => {
      cartItems.value = res.data.content;
      totalElements.value = res.data.page.totalElements;
    })
    .then(() => fetchMyTotalBill())
    .catch(error => handleApiError(error))
    .finally(() => (isLoading.value = false));
}

async function fetchMyTotalBill() {
  const res = await CartService.getMyTotalBill();
  totalPrice.value = res.data.totalPrice;
}

function removeCart(id?: number) {
  if (id === undefined) return;
  CartService.removeOneByCourse(id)
    .then(() => handleSuccessCart())
    .catch(err => handleApiError(err));
}

function handleSuccessCart() {
  store.getCartCountServer();
  fetchCartItems(0);
  ElNotification({
    type: "success",
    title: "Removed from cart",
    duration: 2500
  });
}

onMounted(() => {
  document.title = "Cart | Wedemy";
  store.getIsLoggedIn && fetchCartItems(0);
});

watch([currentPage], function () {
  fetchCartItems(currentPage.value - 1);
});
</script>

<style scoped lang="scss">
.cart-content {
  display: flex;
  height: 70vh;
  width: 100%;
  flex-direction: row;
}

.main-view {
  text-align: center;
  display: flex;
  width: 60%;
  flex-direction: column;
}

.mobile-only {
  display: none;
}

.empty-view {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

.w-card {
  width: 40vw;
  height: max-content;
}

.txt-block {
  text-align: left;
  padding-left: 1em;
}

.w-thumb {
  width: 10em;
  margin-bottom: 20px;
}

.wider {
  width: 90vw;
}

.w-card:hover {
  background-color: ghostwhite;
}

.w-delete {
  cursor: pointer;
  color: red;
  float: right;
  width: max-content;
}

.w-delete:hover {
  text-decoration: solid underline red 1px;
}

.w-title {
  color: black !important;
  font-weight: 700;
  max-width: inherit;
  overflow-x: hidden;
  overflow-y: hidden;
}

.floaty {
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 40%;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2%;
  }

  .w-card {
    width: 100vw;
    font-size: small;
  }

  .mobile-only {
    display: unset;
    margin-bottom: 1em;
  }

  .w-delete {
    margin-left: 20em;
    bottom: 1em;
    font-size: 20px;
  }

  .txt-block {
    text-align: left;
    width: min-content;
    margin-left: 1em;
    //border: 1px solid green;
  }

  .w-delete span {
    display: none;
  }

  .floaty {
    display: none;
  }
}
</style>
