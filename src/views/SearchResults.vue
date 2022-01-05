<template>
  <div>
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
      serverError: "",
      courses: Array<Course>()
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
</style>