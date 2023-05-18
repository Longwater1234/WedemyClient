<!--WISHLIST Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <h3 class="cart-header">My wishlist ({{ wishlistCount }})</h3>

  <div class="main-view" style="height: 70vh" v-loading="isLoading">
    <!-- if nothing in wishlist -->
    <div v-if="wishlistCount === 0" class="empty-view">
      <el-empty description="Your wishlist is empty :("></el-empty>

      <router-link to="/">
        <el-button plain class="btn purple" style="width: 15em">
          Keep shopping
        </el-button>
      </router-link>
    </div>

    <div v-else>
      <!-- START CARD LIST -->
      <el-row v-for="course in wishlistItems" :key="course.id">
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
            <el-icon class="w-delete" @click="removeWish(course.id)">
              <delete-filled /> <span>Remove</span>
            </el-icon>
          </el-card>
        </el-space>
      </el-row>
    </div>
    <!-- end of card list -->
  </div>
</template>

<script lang="ts">
import WishlistService from "@/services/WishlistService";
import store from "@/store";
import { Course } from "@/types";
import { DeleteFilled } from "@element-plus/icons-vue";
import { defineComponent } from "@vue/runtime-core";
import { ElMessage, ElNotification } from "element-plus";

export default defineComponent({
  name: "Wishlist",
  data() {
    document.title = "Wishlist | Wedemy";
    return {
      wishlistItems: new Array<Course>(),
      isLoading: true,
    };
  },
  inject: ["store"],
  methods: {
    fetchWishlist() {
      WishlistService.getAllMine()
        .then((res) => (this.wishlistItems = res.data.content))
        .catch((error) => ElMessage.error(error.message))
        .finally(() => (this.isLoading = false));
    },
    removeWish(id: number) {
      WishlistService.removeOneByCourse(id)
        .then(() => this.handleSuccessWishlist())
        .catch((err) => ElMessage.error(err.message));
    },
    handleSuccessWishlist() {
      this.fetchWishlist();
      return ElNotification({
        type: "success",
        title: "Removed from Wishlist",
        duration: 2500,
      });
    },
  },
  mounted() {
    store.getters.isLoggedIn && this.fetchWishlist();
  },
  components: {
    DeleteFilled,
  },
  computed: {
    wishlistCount(): number {
      return this.wishlistItems.length;
    },
  },
});
</script>

<style scoped>
.main-view {
  text-align: center;
  justify-content: center;
}

.empty-view {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

.w-card {
  width: 40em;
  height: max-content;
}

.w-thumb {
  width: 10em;
  aspect-ratio: 16/9;
  margin-bottom: 20px;
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

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2%;
  }

  .w-card {
    width: 96vw;
    font-size: small;
  }

  .w-thumb {
    width: 8em;
    aspect-ratio: 16/9;
  }

  .w-delete {
    margin-left: 20em;
    bottom: 1em;
    font-size: large;
  }
  .w-delete span {
    display: none !important;
  }
}
</style>
