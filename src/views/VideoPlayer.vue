<template>
  <div class="mycontainer">
    <div class="col1">
      <div class="rowbig">bb</div>
      <div class="rowsmall">cc</div>
    </div>
    <div class="col2">dd</div>
  </div>
</template>

<script lang="ts">
import LessonService from "@/services/LessonService";
import { VideoRequest } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LessonViewer",
  data() {
    document.title = "Lecture | Wedemy";
    return {
      key: "value",
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      LessonService.buildPlayLink(obj)
        .then((res) => console.log(res.data))
        .catch((err) => this.$router.replace("/"));
    },
  },
  mounted() {
    let { courseId, lessonId } = this.$route.params;
    let obj: VideoRequest = {
      courseId: parseInt(courseId.toString()),
      lessonId: lessonId.toString(),
    };
    this.getPlayLink(obj);
  },
});
</script>

<style scoped>
.mycontainer {
  display: flex;
  flex-direction: row;
  width: 98vw;
  /* height: 80vh; */
}

.col1 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 70%;
  border: 1px solid grey;
}
.col2 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30%;
  border: 1px solid green;
}
.rowbig {
  display: flex;
  flex-direction: row;
  height: 70%;
  border: 1px solid blue;
}
.rowsmall {
  display: flex;
  flex-direction: row;
  height: 30%;
  border: 1px solid yellow;
}

@media screen and (max-width: 770px) {
  .mycontainer {
    display: flex;
    flex-direction: column;
  }
  .col1,
  .col2 {
    width: 100%;
  }
}
</style>