<template>
  <div style="height: 80vh">
    <h2 class="most-pop">
      {{ numOfResults }} results for '{{ decodeURI(searchQuery) }}'
    </h2>
    <el-alert
      v-if="serverError.length"
      :title="serverError"
      type="error"
      :closable="false"
    ></el-alert>
    <!-- TODO: ADD GRIDVIEw for results HERE -->
    
    <!-- START COURSE CARD -->
    <div class="course-box">
      <el-space
        direction="vertical"
        alignment="start"
        v-loading="isLoading"
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
import { defineComponent } from "@vue/runtime-core";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "SearchResults",
  data() {
    document.title = `Search Results | Wedemy`;
    return {
      searchQuery: "",
      isLoading: false,
       baseRadius: "var(--el-border-radius-base)",
      serverError: "",
      courses: Array<Course>(),
    };
  },
  methods: {
    fetchCoursesByTitle(title: string) {
      CourseService.findByTitle(title)
        .then((res) => (this.courses = res.data))
        .catch((error) => this.handleError(error))
        .finally(() => (this.isLoading = false));
    },
    goToCourse(id: number) {
      this.$router.push(`/course/${id}`);
    },
    handleError(error: any) {
      if (error.response) this.serverError = error.response.data.message;
      else ElMessage.error(error.message);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    let { q } = this.$route.query;
    this.searchQuery = q ? q.toString() : "";
    this.fetchCoursesByTitle(this.searchQuery);
  },
  watch: {
    //watch 4 address bar changes
    "$route.query.q": {
      deep: false,
      immediate: true,
      handler: function (newVal: string) {
        if (!newVal) return;
        this.isLoading = true;
        this.searchQuery = newVal;
        this.courses = [];
        this.serverError = "";
        this.fetchCoursesByTitle(this.searchQuery);
      },
    },
  },
  computed: {
    numOfResults(): number {
      return this.courses.length;
    },
  },
});
</script>

<style>
.most-pop {
  text-align: center;
  border-bottom: 1px solid grey;
  padding-bottom: 10px;
}

.course-box{
  border: none !important;
  width: 60%;
}
</style>