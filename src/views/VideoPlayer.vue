<template>
  <div class="main-view">
    <h3>{{ singleCourse.title }}</h3>
    <div class="mycontainer">
      <div class="col1">
        <el-row class="rowbig" v-if="videoKey.length">
          <iframe
            :src="getVideoSrc(videoKey)"
            width="980"
            height="551"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </el-row>
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
          <div>{{ item.lessonName }}</div>
          <div>{{ item.lengthSeconds }}</div>
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
      videoKey: "",
      courseId: 0,
      singleLesson: {} as Lesson,
      singleCourse: {} as Course,
      lessonList: new Array<Lesson>(),
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      LessonService.buildPlayLink(obj)
        .then((res) => (this.singleLesson = res.data))
        .then(() => {
          this.videoKey = this.singleLesson.videokey;
          this.fetchSingleCourse(this.courseId);
          this.fetchLessonList(this.courseId);
        })
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

    getVideoSrc(key: string): string {
      return `https://www.youtube-nocookie.com/embed/${key}?modestbranding=1&rel=0`;
    },

    /* redirect to MyLearning  */
    handleError(err: any) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
      this.$router.replace({ name: "MyLearning" });
    },

    handleChange(e: { data: number; target: any }) {
      if (e.data === 0) {
        ElMessage.info("Video Ended");
        //UPDATE STATUS; REDIRECT 2 NEXT LESSON
      }
    },
  },
  mounted() {
    let { courseId, lessonId } = this.$route.params;
    let numCourseId = parseInt(courseId.toString());
    let obj: VideoRequest = {
      courseId: numCourseId,
      lessonId: lessonId.toString(),
    };
    this.courseId = numCourseId;
    this.getPlayLink(obj);
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
}
.rowbig {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
}
.rowbig iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
    position: relative;
    padding-top: 56.25%;
    aspect-ratio: 16/9;
    margin-bottom: 2em;
    padding: 0;
  }

  .rowbig iframe {
    position: absolute;
    height: auto;
    aspect-ratio: 16/9;
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