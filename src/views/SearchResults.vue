<template>
  <div class="wrapper main-view" style="margin-top: 24px">
    <h2 class="most-pop">Search Results for '{{ searchQuery }}'</h2>

    <!-- DISPLAY ERROR div -->
    <div class="server-error" v-if="serverError.length">
      {{ serverError }}
    </div>

    <!-- START CARDS OF RESULTS -->
    <el-space
      direction="vertical"
      alignment="start"
      v-loading="isLoading"
      v-if="courses.length > 0"
      :size="30"
      style="margin-top: 20px; margin-left: 20px"
    >
      <el-space wrap :size="size">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="hover"
          style="margin-bottom: 13px"
          v-for="course in courses"
          @click="goToCourse(course.id)"
          :key="course.id"
          class="courseCard"
        >
          <img :src="course.thumbUrl" class="product-img" :alt="course.title" />
          <div style="padding: 14px">
            <span class="card-title">{{ course.title }}</span>
            <div class="card-author">
              <span>{{ course.author }}</span>
            </div>
            <!-- rating from users -->
            <el-rate
              v-model="course.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            >
            </el-rate>
            <div>${{ course.price }}</div>
          </div>
        </el-card>
      </el-space>
    </el-space>
  </div>
</template>

<script lang="ts">
import CourseService from "@/services/CourseService";
import { Course } from "@/types";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "SearchResults",
  data() {
    document.title = `Search Results | Wedemy`;
    var courses = new Array<Course>();
    return {
      searchQuery: "",
      isLoading: false,
      serverError: "",
      courses,
    };
  },
  methods: {
    fetchCoursesByTitle(title: string) {
      CourseService.findByTitle(title)
        .then((res) => (this.courses = res.data))
        .catch((error) => (this.serverError = error.message))
        .finally(() => (this.isLoading = false));
    },
    goToCourse(id: number) {
      this.$router.push(`/course/${id}`);
    },
  },
  mounted() {
    let { q } = this.$route.query;
    this.searchQuery = q ? q.toString() : "";
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
});
</script>
<style>
.most-pop {
  border-bottom: 1px solid darkkhaki;
  padding-bottom: 10px;
}
</style>