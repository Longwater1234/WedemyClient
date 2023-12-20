<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div
    style="height: 70vh"
    v-loading.fullscreen="isLoading"
    element-loading-text="Please wait. Redirecting you..."
  ></div>
</template>

<script lang="ts" setup>
import EnrollService from "@/service/EnrollService";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { handleApiError } from "@/util/http_util";

const isLoading = ref(true);
const courseId = ref(0);
const router = useRouter();
const route = useRoute();

/* check with backend */
const getRedirectLink = (courseId: number) => {
  EnrollService.getLastViewed(courseId)
    .then(res => redirectToPlayer(res.data.lessonId))
    .catch(error => {
      handleApiError(error);
      router.replace("/account/learning");
    })
    .finally(() => (isLoading.value = false));
};

const redirectToPlayer = (lessonId?: string) => {
  router.replace({
    name: "VideoPlayer",
    params: { courseId: courseId.value, lessonId: lessonId || "" }
  });
};

onMounted(() => {
  //call backend to verify user owns this course
  const courseIdParam = route.params?.courseId;
  courseId.value = courseIdParam ? parseInt(courseIdParam.toString()) : 0;
  setTimeout(() => {
    getRedirectLink(courseId.value);
  }, 200);
});

onBeforeUnmount(() => {
  isLoading.value = false;
});
</script>
