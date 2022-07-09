<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div
    style="height: 70vh"
    v-loading.fullscreen="isLoading"
    element-loading-text="Please wait. Redirecting you..."
  ></div>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResumeCourse",
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
        .catch((error) => this.$router.replace('/account/learning'))
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
    setTimeout(() => {
      this.getRedirectLink(this.courseId);
    }, 500);
  },
  beforeUnmount() {
    this.isLoading = false;
  },
});
</script>
