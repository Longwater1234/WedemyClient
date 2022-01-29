<template>
  <h3 class="cart-header">Your Cart ({{ store.getters.getCartCount }})</h3>

  <div class="jojo">
    <div class="main-view" :class="{ wider: cartItems.length === 0 }">
      <!-- if nothing in cart -->
      <div v-if="!store.getters.getCartCount" class="cart-view">
        <el-empty description="Your cart is empty :("></el-empty>

        <router-link to="/">
          <el-button plain class="btn purple" style="width: 15em">
            Keep shopping
          </el-button>
        </router-link>
      </div>

      <!-- otherwise show list of Cart tems -->
      <div v-else>
        <el-row v-for="course in cartItems" :key="course.id">
          <el-space size="large" direction="vertical">
            <el-card class="w-card" shadow="hover">
              <router-link :to="{ name: 'Course', params: { id: course.id } }">
                <el-col :span="10">
                  <img :src="course.thumbUrl" alt="Thumbnail" class="w-thumb" />
                </el-col>
                <el-col style="text-align: left; padding-left: 1em">
                  <div class="w-title">{{ course.title }}</div>
                  <div class="noblue">{{ course.author }}</div>
                  <div class="noblue">${{ course.price }}</div>
                </el-col>
              </router-link>
              <el-icon class="w-delete" @click="removeCart(course.id)">
                <delete-filled /> <span>Remove</span>
              </el-icon>
            </el-card>
          </el-space>
        </el-row>
      </div>
    </div>
    <!-- start of floaty card RIGHT -->
    <div class="floaty" v-if="cartItems.length">
      <cart-summary :totalPrice="totalPrice"></cart-summary>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import store from "@/store";
import { Course } from "@/types";
import { DeleteFilled } from "@element-plus/icons";
import { ElMessage, ElNotification } from "element-plus";
import CartService from "@/services/CartService";
import CartSummary from "@/components/CartSummary.vue";

export default defineComponent({
  name: "Cart",
  data() {
    document.title = "Cart | Wedemy";
    const cartItems = new Array<Course>();
    return {
      cartItems,
      isLoading: true,
    };
  },
  inject: ["store"],
  methods: {
    fetchCartItems() {
      CartService.getAllMine()
        .then((res) => (this.cartItems = res.data))
        .catch((error) => ElMessage.error(error.message))
        .finally(() => (this.isLoading = false));
    },
    removeCart(id: number) {
      CartService.removeOneByCourse(id)
        .then(() => this.handleSuccessCart())
        .catch((err) => ElMessage.error(err.message));
    },
    handleSuccessCart() {
      store.getCartCountServer();
      this.fetchCartItems();
      return ElNotification({
        type: "success",
        title: "Removed from cart",
        duration: 2500,
      });
    },
  },
  mounted() {
    store.getters.isLoggedIn && this.fetchCartItems();
  },
  components: {
    DeleteFilled,
    CartSummary,
  },
  computed: {
    totalPrice(): number {
      return this.cartItems.map((x) => x.price).reduce((a, b) => a + b, 0);
    },
  },
});
</script>

<style scoped>
.jojo {
  display: flex;
  width: 100%;
  flex-direction: row;
}

.main-view {
  text-align: center;
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
}


.cart-view {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

.w-card {
  width: 40vw;
  height: min-content;
}

.w-thumb {
  width: 10em;
  aspect-ratio: 16/9;
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


.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: black;
  color: white;
  margin-top: 0;
  top: 0;
  padding: 2% 10%;
}

.floaty {
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 40%;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2% 0 2%;
  }
  .cart-header {
    padding: 5% 10%;
  }

  .w-card {
    width: 90vw;
    font-size: small;
  }

  .w-thumb {
    width: 5em;
    aspect-ratio: 16/9;
  }

  .w-delete {
    margin-left: 20em;
    bottom: 10px;
    font-size: 20px;
  }

  .w-delete span {
    display: none;
  }

  .floaty {
    display: none;
  }
}
</style>