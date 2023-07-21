<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div style="height: 80vh">
    <h2 class="most-pop">{{ numOfResults }} results for '{{ decodeURI(searchQuery) }}'</h2>
    <el-alert v-if="serverError.length" :title="serverError" type="error" :closable="false"> </el-alert>

    <div v-loading="isLoading"></div>

    <!-- START COURSE CARD -->
    <div class="course-box">
      <el-space direction="vertical" alignment="start" :size="30" style="margin-top: 2%; margin-left: 10%">
        <!-- START OF SINGLE CARD -->
        <el-space v-if="courses.length" wrap size="large">
          <el-card
            class="courseCard"
            :body-style="{ padding: '0px' }"
            shadow="hover"
            style="margin-bottom: 13px"
            v-for="course in courses"
            :key="course.id"
            @click="router.push(`/course/${course?.id}`)"
          >
            <img :src="course.thumbUrl" class="product-img" :alt="course.title" />
            <div style="padding: 14px">
              <div class="card-title">{{ course.title }}</div>
              <div class="card-author">
                <span>{{ course.author }}</span>
              </div>
              <!-- rating from users -->
              <el-rate v-model="course.rating" disabled show-score text-color="#ff9900" score-template="{value} rating">
              </el-rate>
              <div>${{ course.price }}</div>
            </div>
          </el-card>
        </el-space>
      </el-space>
    </div>
    <!-- END OF SINGLE CARD -->

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
</template>

<script lang="ts" setup>
import CourseService from "@/service/CourseService";
import type { Course } from "@/interfaces/wedemy";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleApiError } from "@/util/http_util";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

const searchQuery = ref("");
const isLoading = ref(false);
const serverError = ref("");
const courses = ref<Course[]>([]);
const router = useRouter();
const route = useRoute();

const isFirst = ref(true); //pagination
const isLast = ref(false); //pagination
const currentPage = ref(1); //pagination

function fetchCoursesByTitle(title: string) {
  isLoading.value = true;
  CourseService.findByTitle(title, currentPage.value - 1)
    .then(res => {
      courses.value = res.data.content;
      isFirst.value = res.data.first;
      isLast.value = res.data.last;
    })
    .catch(err => handleApiError(err))
    .finally(() => (isLoading.value = false));
}

onMounted(() => {
  document.title = "Search Results | Wedemy";
  window.scrollTo(0, 0);
  let { q } = route.query;
  searchQuery.value = q ? q.toString() : "";
  fetchCoursesByTitle(searchQuery.value);
});

onBeforeUnmount(() => {
  searchQuery.value = "";
});

/** on pager click */
function addPage(value: number) {
  currentPage.value += value;
  fetchCoursesByTitle(searchQuery.value);
}

watch([route], function () {
  let newVal = route.query?.q;
  if (!newVal) return;
  isLoading.value = true;
  searchQuery.value = newVal.toString();
  courses.value = [];
  serverError.value = "";
  fetchCoursesByTitle(searchQuery.value);
});

const numOfResults = computed((): number => {
  return courses.value.length;
});
</script>

<style scoped lang="scss">
.most-pop {
  text-align: center;
  border-bottom: 1px solid grey;
  padding-bottom: 10px;
}

.pager {
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: 0 10%;
}

.course-box {
  border: none !important;
  width: 90%;
}
@media screen and (max-width: 770px) {
  .course-box {
    display: flex;
    flex-direction: column;
    width: 70% !important;
    margin: 0 auto;
  }
}
</style>
