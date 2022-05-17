<template>
  <div
    style="height: 70vh"
    v-loading.fullscreen="isLoading"
    element-loading-text="Please wait. Redirecting you..."
  ></div>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LearnCourse",
  data() {
    document.title = "Redirecting you...";
    return {
      isLoading: true,
      courseId: 0,
    };
  },
  methods: {
    /* check with backend */
    getRedirectLink(courseId: number) {
      EnrollService.getLastViewed(courseId)
        .then((res) => this.redirectToPlayer(res.data.lessonId))
        .catch((error) => ElMessage.error(error.message))
        .finally(() => (this.isLoading = false));
    },
    redirectToPlayer(lessonId: string) {
      this.$router.replace({
        name: "VideoPlayer",
        params: { courseId: this.courseId, lessonId: lessonId },
      });
    },
  },
  mounted() {
    //call backend to verify user owns this course
    let { courseId } = this.$route.params;
    this.courseId = parseInt(courseId.toString());
    this.getRedirectLink(this.courseId);
  },
  beforeUnmount() {
    this.isLoading = false;
  },
});
</script>

<style scoped>
</style>