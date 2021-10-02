<template>
  <div
      v-loading.fullscreen.lock="isLoading"
      class="wrapper main-view"
      style="margin-top: 24px"
  >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/category' }">
        {{ singleCourse.category }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ singleCourse.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="color: red" v-if="errorMessage.length">{{ errorMessage }}</div>

    <!-- START SINGLE COUSE -->
    <div
        v-if="!errorMessage.length"
        class="course-view"
        style="margin-top: 24px"
    >
      <div class="course-preview">
        <img
            :src="singleCourse.thumbUrl"
            :alt="singleCourse.title"
            class="course-thumbnail"
        />
      </div>

      <div class="course-details">
        <h1>{{ singleCourse.title }}</h1>
        <p style="font-size: 19px">{{ singleCourse.category }}</p>
        <p class="course-view" style="margin-top: 9px">
          <el-rate
              v-model="singleCourse.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} rating"
          >
          </el-rate>
          <!-- &nbsp; (N ratings) -->
        </p>
        <p>{{ singleCourse.author }}</p>
        <h3>${{ singleCourse.price }}</h3>
        <el-button type="success" class="course-btn" @click="addtoCart()">
          Add to Cart
        </el-button>
        <el-button
            :type="wishlisted ? 'danger' : 'info'"
            class="course-btn"
            @click="toggleWishlist(singleCourse.id)"
            :icon="wishlisted ? 'el-icon-star-on' : 'el-icon-star-off'"
            :loading="loadingWishlist"
            plain
        >
          {{ wishlisted ? "Wishlisted" : "Wishlist" }}
        </el-button>
      </div>
    </div>
    <!-- END SINGLE COURSE -->

    <div style="margin-top: 19px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="What you'll learn" name="first">
          Description
        </el-tab-pane>
        <el-tab-pane label="Content" name="second">List of lessons</el-tab-pane>
        <el-tab-pane label="Reviews" name="third">review cards</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import CourseService from "@/services/CourseService";
import WishlistService from "@/services/WishlistService";
import store from "@/store";
import {defineComponent} from "@vue/runtime-core";
import {ElMessage, ElNotification} from "element-plus";

export default defineComponent({
  data() {
    return {
      activeName: "first",
      courseId: 0,
      errorMessage: "",
      wishlisted: false,
      loadingWishlist: false,
      isLoading: true,
      singleCourse: {
        title: "",
        price: 0,
        rating: 0.0,
        thumbUrl: "",
        category: "",
      },
    };
  },
  methods: {
    addtoCart() {
      ElNotification({
        title: "Cart",
        type: "success",
        message: "Item was successfully added to cart",
        duration: 2500,
      });
    },
    toggleWishlist(courseId: number) {
      const self = this;
      if (!store.getters.isLoggedIn) return self.LoginMessage();
      self.loadingWishlist = true;
      let myAction =
          self.wishlisted
              ? WishlistService.removeOne(courseId)
              : WishlistService.addNew(courseId);
      myAction
          .then(() => (self.wishlisted = !self.wishlisted))
          .catch((error) => ElMessage.error(error.message))
          .finally(() => (self.loadingWishlist = false));
    },
    fetchSingleCourse(courseId: number) {
      CourseService.getById(courseId)
          .then((res) => {
            this.singleCourse = res.data;
            document.title = `${this.singleCourse.title} | Wedemy`;
          })
          .catch((error) => {
            this.errorMessage = error.message;
          })
          .finally(() => (this.isLoading = false));
    },
    checkWishlistStatus(courseId: number) {
      WishlistService.checkifWishlisted(courseId).then((res) => {
        this.wishlisted = res.data.isWishlist;
      });
    },
    LoginMessage() {
      ElMessage.warning("Must be logged in");
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.isLoading = true;
    this.courseId = parseInt(this.$route.path.split(/course\//)[1]);
    this.fetchSingleCourse(this.courseId);
    store.getters.isLoggedIn && this.checkWishlistStatus(this.courseId);
  },
});
</script>

<style>
.course-view {
  display: flex;
  flex-direction: row;
}

.course-preview {
  float: left;
  max-width: 50%;
}

.course-details {
  float: right;
  padding: 2%;
}

.course-thumbnail {
  width: 100%;
}

.course-btn {
  width: 10em;
  margin-top: 10px;
}

@media only screen and (max-width: 600px) {
  .course-thumbnail {
    width: 95vw;
    align-self: center;
    margin: 0 auto;
  }

  .course-view {
    flex-direction: column;
  }
}
</style>
