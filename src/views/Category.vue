<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div class="main-body">
    <h2 class="serif-head">{{ categoryName }} Courses</h2>

    <el-alert
      v-if="serverError"
      :title="serverError"
      type="error"
      :closable="false"
    >
    </el-alert>

    <div v-loading="isLoading"></div>

    <!-- START COURSE CARD -->
    <div class="course-box" :style="{ borderRadius: baseRadius }">
      <el-space
        direction="vertical"
        alignment="start"
        :size="30"
        style="margin-top: 2%; margin-left: 10%"
      >
        <!-- START OF SINGLE CARD -->
        <el-space v-if="courses.length" wrap size="large">
          <el-card
            class="courseCard"
            :body-style="{ padding: '0px' }"
            shadow="hover"
            style="margin-bottom: 13px"
            v-for="course in courses"
            :key="course.id"
            @click="goToCourse(course.id)"
          >
            <img
              :src="course.thumbUrl"
              class="product-img"
              :alt="course.title"
            />
            <div style="padding: 14px">
              <div class="card-title">{{ course.title }}</div>
              <div class="card-author">
                <span>{{ course.author }}</span>
              </div>
              <!-- rating from users -->
              <el-rate
                v-model="course.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} rating"
              >
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

<script lang="ts">
import CourseService from "@/services/CourseService";
import { Course } from "@/types";
import { defineComponent } from "vue";
import { AxiosError } from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Category",
  data() {
    document.title = "Wedemy";
    return {
      categoryName: "",
      serverError: "",
      baseRadius: "var(--el-border-radius-base)",
      isLoading: false,
      courses: new Array<Course>(),
    };
  },
  methods: {
    goToCourse(id: number) {
      this.$router.push(`/course/${id}`);
    },
    fetchCoursesByCategory(name: string) {
      this.isLoading = true;
      CourseService.getByCategory(name)
        .then((res) => (this.courses = res.data))
        .catch((error) => this.handleError(error))
        .finally(() => (this.isLoading = false));
    },

    /** display error  */
    handleError(err: AxiosError) {
      let mama = err.response ? err.response.data.message : err.message;
      this.serverError = mama;
    },
  },
  mounted() {
    let { name } = this.$route.params;
    this.categoryName = name ? name.toString() : "";
    this.fetchCoursesByCategory(this.categoryName);
    document.title = `Courses in ${this.categoryName} | Wedemy`;
  },
  watch: {
    "$route.params.name": {
      deep: false,
      immediate: true,
      handler: function (newVal: string) {
        if (!newVal) return;
        this.categoryName = newVal;
        this.fetchCoursesByCategory(this.categoryName);
        document.title = `Courses in ${this.categoryName} | Wedemy`;
      },
    },
  },
});
</script>

<style scoped>
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
