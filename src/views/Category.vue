<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div class="main-body">
    <h2 class="serif-head">{{ categoryName }} Courses</h2>

    <el-alert v-if="serverError" :title="serverError" type="error" :closable="false"> </el-alert>

    <div v-loading="isLoading"></div>

    <!-- START COURSE CARD -->
    <div class="course-box" :style="{ borderRadius: baseRadius }">
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
            @click="router.push(`/course/${course.id}`)"
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
  </div>
</template>

<script lang="ts" setup>
import CourseService from "@/service/CourseService";
import type { Course } from "@/interfaces/wedemy";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleApiError } from "@/util/http_util";

const router = useRouter();
const route = useRoute();

const categoryName = ref("");
const serverError = ref("");
const baseRadius = ref("var(--el-border-radius-base)");
const isLoading = ref(false);
const courses = ref<Course[]>([]);

function fetchCoursesByCategory(name: string) {
  isLoading.value = true;
  CourseService.getByCategory(name)
    .then(res => (courses.value = res.data))
    .catch(error => handleApiError(error))
    .finally(() => (isLoading.value = false));
}

onMounted(() => {
  const { name } = route.params;
  categoryName.value = name ? name.toString() : "";
  fetchCoursesByCategory(categoryName.value);
  document.title = `Courses in ${categoryName.value} | Wedemy`;
});

watch([route], function () {
  const newVal = route.params.name;
  if (!newVal) return;
  categoryName.value = newVal.toString();
  fetchCoursesByCategory(categoryName.value);
  document.title = `Courses in ${categoryName.value} | Wedemy`;
});
</script>

<style lang="scss" scoped>
.underscore {
  padding-bottom: 0.5em;
  border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
}

.main-body {
  height: 80vh;
}

@media screen and (max-width: 770px) {
  .main-body {
    height: unset;
  }
}
</style>
