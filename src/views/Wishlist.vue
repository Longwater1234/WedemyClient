<template>
  <h3 class="cart-header">Your wishlist ({{ wishlistCount }})</h3>

  <div class="main-view" style="height: 70vh">
    <!-- if nothing in cart -->
    <div v-if="wishlistCount === 0" class="cart-view">
      <el-empty description="Your wishlist is empty :("></el-empty>

      <router-link to="/">
        <el-button plain class="btn purple" style="width: 15em">
          Keep shopping
        </el-button>
      </router-link>
    </div>

    <!-- otherwise show list cards of Wishlist -->
    <div v-else>
      <el-row v-for="wish in wishlistItems" :key="wish.wishlistId">
        <el-space size="large" direction="vertical">
          <el-card shadow="hover" :body-style="{ width: '500px' }">
            <el-col :span="10">
              <img
                :src="wish.course.thumbUrl"
                alt="Thumbnail"
                style="width: 10em; aspect-ratio: 16/9"
              />
            </el-col>
            <el-col style="text-align: left; padding-left: 1em">
              <div>{{ wish.course.title }}</div>
              <div>{{ wish.course.author }}</div>
              <div>${{ wish.course.price }}</div>
            </el-col>
          </el-card>
        </el-space>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import WishlistService from "@/services/WishlistService";
import store from "@/store";
import { Wishlist } from "@/types";
import { defineComponent } from "@vue/runtime-core";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Wishlist",
  data() {
    document.title = "Wishlist | Wedemy";
    const wishlistItems = new Array<Wishlist>();
    return {
      wishlistItems,
      isLoading: true,
    };
  },
  inject: ["store"],
  methods: {
    fetchWishlist() {
      WishlistService.getAllMine()
        .then((res) => (this.wishlistItems = res.data))
        .catch((error) => ElMessage.error(error.message))
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    store.getters.isLoggedIn && this.fetchWishlist();
  },
  computed: {
    wishlistCount(): number {
      return this.wishlistItems.length;
    },
  },
});
</script>

<style>
.main-view {
  text-align: center;
  justify-content: center;
}

.main-view {
  padding: 0 10% 0 10%;
}

.cart-view {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: black;
  color: white;
  margin-top: 0;
  top: 0;
  padding: 2% 10%;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2% 0 2%;
  }
  .cart-header {
    padding: 5% 10%;
  }
}
</style>