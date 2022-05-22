<template>
  <div class="main-view">
    <h3>{{ singleCourse.title }}</h3>
    <div class="mycontainer">
      <div class="col1">
        <div class="rowbig">bb</div>
        <div class="rowsmall">
          <el-col>
            <p class="biggy">Lesson {{ singleLesson.lessonName }}</p>
            <p>{{ singleCourse.subtitle }}</p>
          </el-col>
        </div>
      </div>
      <div class="col2">dd</div>
    </div>
  </div>
</template>

<script lang="ts">
import CourseService from "@/services/CourseService";
import LessonService from "@/services/LessonService";
import { Course, Lesson, VideoRequest } from "@/types";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  name: "VideoPlayer",
  data() {
    document.title = "Lecture | Wedemy";
    return {
      singleLesson: {} as Lesson,
      singleCourse: {} as Course,
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      LessonService.buildPlayLink(obj)
        .then((res) => (this.singleLesson = res.data))
        .catch((err) => this.handleError(err));
    },

    fetchSingleCourse(courseId: number) {
      CourseService.getById(courseId).then((res) => {
        this.singleCourse = res.data;
        document.title = `Lecture | ${this.singleCourse.title} | Wedemy`;
      });
    },

    /* redirect to MyLearning  */
    handleError(err: any) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
      this.$router.replace({ name: "MyLearning" });
    },
  },
  mounted() {
    let { courseId, lessonId } = this.$route.params;
    let numCourseId = parseInt(courseId.toString());
    let obj: VideoRequest = {
      courseId: numCourseId,
      lessonId: lessonId.toString(),
    };
    this.getPlayLink(obj);
    this.fetchSingleCourse(numCourseId);
  },
});
</script>

<style scoped>
.mycontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.col1 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 70%;
}
.col2 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30%;
  border: 1px green solid;
}
.rowbig {
  display: flex;
  background-color: var(--dark);
  flex-direction: row;
  color: white;
  width: 100%;
  padding-top: 56.25%;
}
.rowsmall {
  display: flex;
  flex-direction: row;
  height: 30%;
}

.biggy {
  font-size: 1.5em;
  margin-bottom: 1em;
}

@media screen and (max-width: 900px) {
  .main-view {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .mycontainer {
    display: flex;
    flex-direction: column;
  }
  .rowbig {
    width: 100%;
    padding-top: 56.25%;
  }

  .rowsmall {
    height: fit-content;
  }

  .col1,
  .col2 {
    width: 100%;
  }
  .col1 {
    height: fit-content;
  }
  .col2 {
    height: auto;
  }
}
</style>