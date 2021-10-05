<template >
  <div class="wrapper main-view" style="margin-top: 24px">
    <h2 class="most-pop">{{ categoryName }}</h2>

    <el-space
      direction="vertical"
      alignment="start"
      v-loading="isLoading"
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
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Category",
  data() {
    document.title = "Wedemy";
    var courses = new Array<Course>();
    return {
      size: "large",
      value: 4.7,
      categoryName: "",
      isLoading: true,
      courses,
    };
  },
  mounted() {
    let { name } = this.$route.params;
    this.categoryName = name.toString();
    document.title = `Courses in ${this.categoryName} | Wedemy`;
    this.fetchCoursesbyCategory(this.categoryName);
  },
  methods: {
    fetchCoursesbyCategory(name: string) {
      CourseService.getByCategory(name)
        .then((res) => (this.courses = res.data))
        .catch((error) => ElMessage.error(error.message))
        .finally(() => (this.isLoading = false));
    },
    goToCourse(id: number) {
      this.$router.push(`/course/${id}`);
    },
  },
  watch: {
    //watch 4 address bar changes
    "$route.params.name": {
      deep: false,
      immediate: true,
      handler: function (newVal: string) {
        if (!newVal) return;
        this.isLoading = true;
        this.categoryName = newVal;
        this.fetchCoursesbyCategory(this.categoryName);
        document.title = `Courses in ${this.categoryName} | Wedemy`;
      },
    },
  },
});
</script>

<style >
.most-pop {
  border-bottom: 1px solid darkkhaki;
  padding-bottom: 10px;
}

.courseCard {
  width: 285px;
}

.courseCard:hover {
  cursor: pointer;
}
</style>