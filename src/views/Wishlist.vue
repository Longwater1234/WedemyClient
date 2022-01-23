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

    <!-- otherwise show list of Wishlist items -->
    <div v-else>
      <el-row v-for="course in wishlistItems" :key="course.id">
        <el-space size="large" direction="vertical">
          <router-link :to="{ name: 'Course', params: { id: course.id } }">
            <el-card class="w-card" shadow="hover">
              <el-col :span="10">
                <img :src="course.thumbUrl" alt="Thumbnail" class="w-thumb" />
              </el-col>
              <el-col style="text-align: left; padding-left: 1em">
                <div class="w-title">{{ course.title }}</div>
                <div>{{ course.author }}</div>
                <div>${{ course.price }}</div>
              </el-col>
            </el-card>
          </router-link>
          <el-icon class="w-delete" @click="removeWish(course.id)">
            <delete-filled /> Remove
          </el-icon>
        </el-space>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import WishlistService from "@/services/WishlistService";
import store from "@/store";
import { Course } from "@/types";
import { DeleteFilled } from "@element-plus/icons";
import { defineComponent } from "@vue/runtime-core";
import { ElMessage, ElNotification } from "element-plus";

export default defineComponent({
  name: "Wishlist",
  data() {
    document.title = "Wishlist | Wedemy";
    const wishlistItems = new Array<Course>();
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

.main-view {
  padding: 0 10% 0 10%;
}

.cart-view {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

.w-card {
  width: 40em;
  height: min-content;
}

.w-thumb {
  width: 10em;
  aspect-ratio: 16/9;
  margin-bottom: 20px;
}

.w-card:hover {
  cursor: pointer;
  background-color: ghostwhite;
}

.w-delete {
  cursor: pointer;
  color: red;
  width: max-content;
  margin-left: 35em;
}

.w-title {
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

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2% 0 2%;
  }
  .cart-header {
    padding: 5% 10%;
  }

  .w-card {
    max-width: 27em;
    font-size: small;
  }

  .w-thumb {
    width: 5em;
    aspect-ratio: 16/9;
  }

  .w-delete {
    margin-left: 20em;
    font-size: small;
  }
}
</style>