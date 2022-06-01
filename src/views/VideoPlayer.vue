<template>
  <div class="main-view">
    <h3>{{ singleCourse.title }}</h3>
    <div class="mycontainer">
      <div class="col1">
        <div class="rowbig" v-if="videoLink.length">
          <youtube-iframe
            :video-id="videoLink"
            :player-width="1280"
            :player-height="720"
            :no-cookie="true"
            @state-change="handleChange"
          ></youtube-iframe>
        </div>
        <div class="rowsmall">
          <el-col>
            <p class="biggy">
              Lesson {{ singleLesson.lessonName }}
              <span>| {{ singleLesson.lengthSeconds }}</span>
            </p>
            <p>{{ singleCourse.subtitle }}</p>
          </el-col>
        </div>
      </div>
      <div class="col2">
        <div v-for="item in lessonList" :key="item.id">
          <p>{{ item.lessonName }}</p>
          <p>{{ item.lengthSeconds }}</p>
        </div>
      </div>
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
      videoLink: "",
      singleLesson: {} as Lesson,
      singleCourse: {} as Course,
      lessonList: new Array<Lesson>(),
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      LessonService.buildPlayLink(obj)
        .then((res) => (this.singleLesson = res.data))
        .then(() => (this.videoLink = this.singleLesson.videokey))
        .catch((err) => this.handleError(err));
    },

    fetchSingleCourse(courseId: number) {
      CourseService.getById(courseId).then((res) => {
        this.singleCourse = res.data;
        document.title = `Lecture | ${this.singleCourse.title} | Wedemy`;
      });
    },

    fetchLessonList(courseId: number) {
      LessonService.getLessonsByCourse(courseId).then(
        (res) => (this.lessonList = res.data)
      );
    },

    /* redirect to MyLearning  */
    handleError(err: any) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
      this.$router.replace({ name: "MyLearning" });
    },

    handleChange(e: Event) {
      console.log(e);
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
    this.fetchLessonList(numCourseId);
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
  position: relative;
  width: 80%;
  /* padding-top: 56.25%; */
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