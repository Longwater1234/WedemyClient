<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div v-loading.fullscreen.lock="isLoading" class="darkBox">
    <el-alert class="errorBox" v-if="errorMessage.length" :title="errorMessage" type="error" :closable="false">
    </el-alert>

    <div v-if="!errorMessage" class="mainStart">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="'/category/' + singleCourse.category">
          {{ singleCourse.category }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ singleCourse.title }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!--  START course info -->
      <img :src="singleCourse.thumbUrl" class="course-img" alt="thumbnail" />
      <h1 class="course-title">{{ singleCourse.title }}</h1>
      <p class="course-subtitle">{{ singleCourse.subtitle }}</p>
      <el-rate class="myrating" v-model="singleCourse.rating" disabled show-score score-template="{value} rating" />
      <h3 class="courseAuthor">Created by {{ singleCourse.author }}</h3>
    </div>
  </div>

  <!-- FLOATING CARD: COMPONENT -->
  <course-details
    v-if="!errorMessage"
    @toggleWishlist="onToggleWishlist"
    @toggleCart="onToggleCart"
    style="margin-top: -300px"
    :inWishlist="inWishlist"
    :isOwned="isOwned"
    :inCart="inCart"
    :singleCourse="singleCourse"
  >
  </course-details>
  <!-- END of CARD -->

  <!--  START OF objectives -->
  <div class="course-info" v-if="!errorMessage">
    <h2>What You'll Learn</h2>
    <div>
      <p class="obj-item" v-for="item in objectives" :key="item.id">&#10003; &nbsp;{{ item.objective }}</p>
    </div>
  </div>

  <!--  START OF lessons-->
  <div class="course-info" v-if="!errorMessage">
    <h2>Course Content</h2>
    <el-collapse v-model="activeName">
      <el-collapse-item :title="`${lessonCount} lectures in this course`" name="1">
        <ul class="lessonlist">
          <li class="obj-item" v-for="item in lessons" :key="item.id">
            <lock v-if="!isOwned" style="width: 1em; height: 1em" />
            <caret-right v-else style="width: 1.5em" />
            {{ item.lessonName }}
            <i>({{ item.lengthSeconds }}) </i>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>

  <!--  START OF REVIEWS -->
  <div class="course-info" v-if="!errorMessage">
    <h2>Student Reviews</h2>
    <!-- REVIEW HEADER -->
    <el-row>
      <el-col :span="12">
        <div class="biggy">
          <star-filled style="width: 1em" />
          {{ singleCourse.rating }}
          <span>Rating</span>
        </div>
      </el-col>
      <el-col :span="12">
        Sort by:
        <el-select v-model="sortBy" @change="sortChanged">
          <el-option label="Date" value="createdAt" />
          <el-option label="Rating" value="rating" />
        </el-select>
      </el-col>
    </el-row>
    <!-- ACTUAL REVIEW LIST -->
    <div v-if="reviewList.length">
      <div v-for="item in reviewList" :key="item.id">
        <review-card :review="item" />
      </div>

      <!-- PAGINATION (reviews) -->
      <div class="pager">
        <span style="margin-right: 0.5em">Page: &nbsp;{{ currentPage }}</span>
        <el-button-group>
          <el-button type="primary" :disabled="isFirst" @click="addPage(-1)">
            <el-icon><arrow-left /></el-icon>
            Prev Page
          </el-button>
          <el-button type="primary" :disabled="isLast" @click="addPage(1)">
            Next Page
            <el-icon> <arrow-right /> </el-icon>
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div v-else class="nodata">No reviews yet!</div>
  </div>

  <!-- FIXED AT BOTTOM ON MOBILE -->
  <mobile-details
    v-if="!errorMessage"
    class="mobile-only"
    :isOwned="isOwned"
    :inCart="inCart"
    :inWishlist="inWishlist"
    @toggleCart="onToggleCart"
    @toggleWishlist="onToggleWishlist"
    :singleCourse="singleCourse"
  >
  </mobile-details>
</template>

<script lang="ts" setup>
import { ArrowLeft, ArrowRight, CaretRight, Lock, StarFilled } from "@element-plus/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import CourseService from "@/service/CourseService";
import LessonService from "@/service/LessonService";
import EnrollService from "@/service/EnrollService";
import ReviewService from "@/service/ReviewService";
import WishlistService from "@/service/WishlistService";
import CartService from "@/service/CartService";
import type { Course, Lesson } from "@/interfaces/wedemy";
import CourseDetails from "@/components/CourseDetails.vue";
import { ElNotification } from "element-plus";
import ReviewCard from "@/components/ReviewCard.vue";
import MobileDetails from "@/components/MobileDetails.vue";
import type { ReviewDto, SortParam } from "@/interfaces/custom";
import { handleApiError } from "@/util/http_util";
import { useStudentStore } from "@/stores";
import { useRoute } from "vue-router";

document.title = "Course | Wedemy";

const store = useStudentStore();
const route = useRoute();

const activeName = ref("1");
const currentPage = ref(1); //pagination
const isFirst = ref(true); //pagination
const isLast = ref(false); //pagination
const sortBy = ref<SortParam>("createdAt"); //pagination
const isLoading = ref(false);
const errorMessage = ref("");
const courseId = ref(0);
const objectives = ref<{ id: number; objective: string }[]>([]);
const lessons = ref<Lesson[]>([]);
const inWishlist = ref(false);
const inCart = ref(false);
const isOwned = ref(false);
const reviewList = ref<ReviewDto[]>([]);
const singleCourse: Partial<Course> = reactive({});

/** Get detail for given course */
function fetchSingleCourse(courseId: number) {
  isLoading.value = true;
  CourseService.getById(courseId)
    .then(res => {
      Object.assign(singleCourse, res.data);
      fetchReviewList(courseId, 0);
      document.title = `${singleCourse.title} | Wedemy`;
    })
    .catch(error => (errorMessage.value = error.message))
    .finally(() => (isLoading.value = false));
}

/** Get course objectives */
function fetchObjectives(courseId: number) {
  CourseService.getObjectivesByCourse(courseId).then(res => {
    objectives.value = res.data;
  });
}

/** Get all lessons in this course */
function fetchLessonList(courseId: number) {
  LessonService.getLessonsByCourse(courseId).then(res => (lessons.value = res.data.content));
}

/** GET ALL REVIEWS for course */
function fetchReviewList(courseId: number, pageIndex: number) {
  ReviewService.getByCourseId(courseId, pageIndex, sortBy.value).then(res => {
    reviewList.value = res.data.content;
    isFirst.value = res.data.first;
    isLast.value = res.data.last;
  });
}

/** on pager click */
function addPage(value: number) {
  currentPage.value += value;
  fetchReviewList(courseId.value, currentPage.value - 1);
}

/** IF USER OWNS THIS COURSE */
function checkEnrollStatus(courseId: number) {
  EnrollService.checkStatus(courseId)
    .then(res => (isOwned.value = res.data.isOwned))
    .then(() => {
      if (isOwned.value) return;
      checkWishlistStatus(courseId);
      checkCartStatus(courseId);
    });
}

/** listen for event from Child */
function onToggleWishlist(courseId?: number) {
  if (courseId === undefined) return;
  const myAction = inWishlist.value ? WishlistService.removeOneByCourse(courseId) : WishlistService.addNew(courseId);
  myAction.then(() => (inWishlist.value = !inWishlist.value)).catch(error => handleApiError(error));
}

/** is Course ALREADY in wishlist? */
function checkWishlistStatus(courseId: number) {
  WishlistService.checkIsWishlist(courseId).then(res => {
    inWishlist.value = res.data.inWishlist;
  });
}

/** listen for Event from Child */
function onToggleCart(courseId?: number) {
  if (courseId === undefined) return;
  const myAction = inCart.value ? CartService.removeOneByCourse(courseId) : CartService.addNew(courseId);
  myAction.then(() => handleSuccessCart(inCart.value)).catch(error => handleApiError(error));
}

/** CHECK IF ALREADY IN CART */
function checkCartStatus(courseId: number) {
  CartService.checkItemInCart(courseId).then(res => {
    inCart.value = res.data.inCart;
  });
}

/** AFTER ADDING TO CART */
function handleSuccessCart(isInCart: boolean) {
  inCart.value = !isInCart;
  store.getCartCountServer(); //refresh store
  return ElNotification({
    type: "success",
    title: notifMessage.value,
    duration: 2000
  });
}

/** on selected sort */
function sortChanged() {
  fetchReviewList(courseId.value, currentPage.value - 1);
}

const lessonCount = computed(() => {
  return lessons.value.length;
});

const notifMessage = computed(() => {
  return inCart.value ? "Added to Cart" : "Removed from Cart";
});

onMounted(() => {
  window.scrollTo(0, 0);
  isLoading.value = true;
  const { id } = route.params;
  courseId.value = parseInt(id.toString());
  fetchSingleCourse(courseId.value);
  fetchObjectives(courseId.value);
  fetchLessonList(courseId.value);
  store.getIsLoggedIn && checkEnrollStatus(courseId.value);
});
</script>

<style scoped>
@import "@/styles/course-page.scss";
</style>
