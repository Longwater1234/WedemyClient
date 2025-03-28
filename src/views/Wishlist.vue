<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <h3 class="cart-header">My wishlist ({{ wishlistCount }})</h3>

  <div class="cart-content" v-loading="store.getIsLoggedIn && isLoading">
    <div class="main-view" style="height: 70vh">
      <!-- if nothing in wishlist -->
      <div v-if="wishlistCount === 0" class="empty-view">
        <el-empty description="Your wishlist is empty :(" />

        <router-link to="/">
          <el-button plain class="btn purple" style="width: 15em"> Keep shopping </el-button>
        </router-link>
      </div>

      <div v-else>
        <!-- START CARD LIST -->
        <el-row v-for="course in wishlistItems" :key="course.id">
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
              <el-icon class="w-delete" @click="removeWish(course?.id)">
                <delete-filled /> <span>Remove</span>
              </el-icon>
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
      <!-- end of card list -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import WishlistService from "@/service/WishlistService";
import { DeleteFilled } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { computed, onMounted, ref, watch } from "vue";
import { useStudentStore } from "@/stores";
import { handleApiError } from "@/util/http_util";
import type { Course } from "@/interfaces/wedemy";

const store = useStudentStore();

const wishlistItems = ref<Course[]>([]);
const isLoading = ref(true);
const totalElements = ref(0); //pagination
const currentPage = ref(1); // pagination

function fetchWishlist(page: number) {
  WishlistService.getMinePaged(page)
    .then(res => {
      wishlistItems.value = res.data.content;
      totalElements.value = res.data.page.totalElements;
    })
    .catch(err => handleApiError(err))
    .finally(() => (isLoading.value = false));
}

function removeWish(id?: number) {
  if (id === undefined) return;
  WishlistService.removeOneByCourse(id)
    .then(() => handleSuccessWishlist())
    .catch(err => handleApiError(err));
}

function handleSuccessWishlist() {
  fetchWishlist(0);
  ElNotification({
    type: "success",
    title: "Removed from Wishlist",
    duration: 2500
  });
}

onMounted(() => {
  document.title = "Wishlist | Wedemy";
  store.getIsLoggedIn && fetchWishlist(0);
});

const wishlistCount = computed((): number => {
  return totalElements.value;
});

watch([currentPage], function () {
  fetchWishlist(currentPage.value - 1);
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
  width: 75vw;
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
    width: 96vw;
    font-size: small;
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
  }

  .w-delete span {
    display: none;
  }
}
</style>
