<template>
  <div class="wrapper">
    <p class="cart-header main-view">Your wishlist ({{ wishlistCount }})</p>

    <div v-loading="isLoading" class="main-view top-margin">
      <!-- if nothing in wishlist -->
      <div v-if="wishlistCount === 0" class="cart-view">
        <!-- TODO: ADD IMAGE (empty) HERE -->
        <el-empty description="Your wishlist is empty. :("></el-empty>

        <router-link to="/">
          <button class="btn btn-auto btn-accent" style="color: white">
            Keep exploring
          </button>
        </router-link>
      </div>
      <!-- otherwise show list cards of Wishlist -->
      <div v-else>
        <el-col>
          <el-row
            :gutter="6"
            v-for="wish in wishlistItems"
            :key="wish.wishlistId"
          >
            <el-card shadow="hover">
              <el-row justify="flex">
                <el-col :sm="6">
                  <img
                    :src="wish.course.thumbUrl"
                    alt="Thumbnail"
                    style="width: 100%"
                  />
                </el-col>
                <el-col>
                  <div>{{ wish.course.title }}</div>
                  <div>{{ wish.course.author }}</div>
                  <div>${{ wish.course.price }}</div>
                </el-col>
              </el-row>
            </el-card>
          </el-row>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import WishlistService from "@/services/WishlistService";
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
    this.fetchWishlist();
  },
  computed: {
    wishlistCount(): number {
      return this.wishlistItems.length;
    },
  },
});
</script>

<style>
.cart-header {
  background-color: var(--dark);
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  font-size: 24px;
  color: white;
}
.cart-view {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}
</style>