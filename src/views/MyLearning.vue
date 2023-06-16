<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <h2 class="cart-header">My Learning</h2>
  <div class="main-view" style="height: 70vh" v-loading="isLoading">
    <el-alert v-if="serverError.length" :title="serverError" type="error" :closable="false"></el-alert>

    <h3 class="serif-head">Courses you're enrolled in</h3>
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
            @click="goToCourse(course.courseId)"
          >
            <img :src="course.thumbUrl" class="product-img" :alt="course.title" />
            <div style="padding: 14px">
              <div class="card-title">{{ course.title }}</div>
              <el-progress class="myprogress" :percentage="course.progress" />
              <small v-if="course.progress === 100">Completed</small>
            </div>
          </el-card>
        </el-space>

        <el-space v-else wrap size="large" fill>
          <h4 style="margin: auto; color: grey">You haven't enrolled in any course.</h4>
        </el-space>
      </el-space>
    </div>
    <!-- END OF SINGLE CARD -->
  </div>
</template>

<script lang="ts" setup>
import EnrollService from "@/service/EnrollService";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { EnrollmentDto } from "@/interfaces/custom";

const isLoading = ref(true);
const serverError = ref("");
const courses = ref<EnrollmentDto[]>([]);
const router = useRouter();

function fetchAllEnrolled(page: number) {
  EnrollService.getAllMyCourses(page)
    .then(res => (courses.value = res.data))
    .catch(err => (serverError.value = err.message))
    .finally(() => (isLoading.value = false));
}

function goToCourse(id: number) {
  router.push({ name: "ResumeCourse", params: { courseId: id } });
}
onMounted(() => {
  document.title = "My Learning | Wedemy";
  fetchAllEnrolled(0);
});
</script>

<style scoped>
.main-body {
  margin: 2%;
  padding: 1em;
}

.courseCard {
  width: min-content;
  height: 16em;
}

.card-title {
  text-align: left;
}

.serif-head {
  margin-left: 10%;
  margin-bottom: 0;
}

.myprogress {
  width: 8em;
  margin-top: 1em;
}

.product-img {
  height: 8em !important;
}

.course-box {
  border: none !important;
  width: 100% !important;
}

@media screen and (max-width: 770px) {
  .cart-header {
    padding: 5% 10%;
    height: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
