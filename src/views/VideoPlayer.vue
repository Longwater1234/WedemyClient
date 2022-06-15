<template>
  <div class="main-view">
    <h3>{{ singleCourse.title }}</h3>
    <div class="mycontainer">
      <div class="col1">
        <youtube-iframe
          v-if="videoKey.length"
          :video-id="videoKey"
          :player-width="980"
          :player-height="551"
          :no-cookie="true"
          @state-change="handleChange"
          :player-parameters="playerParams"
        ></youtube-iframe>
        <div class="rowsmall">
          <div>
            <p class="biggy" v-if="videoKey.length">
              Lesson {{ videoResponse.lesson.lessonName }}
              <span>| {{ videoResponse.lesson.lengthSeconds }}</span>
            </p>
            <p>{{ singleCourse.subtitle }}</p>
          </div>
        </div>
      </div>
      <div class="col2">
        <div
          v-for="item in lessonList"
          :key="item.id"
          :class="{ boldy: item.isWatched }"
        >
          <div>{{ item.lesson_name }}</div>
          <div>{{ item.fmt_time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Course,
  Lesson,
  VideoRequest,
  VideoResponse,
  WatchStatus,
} from "@/types";
import CourseService from "@/services/CourseService";
import EnrollService from "@/services/EnrollService";
import LessonService from "@/services/LessonService";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
  name: "VideoPlayer",
  data() {
    document.title = "Lecture | Wedemy";
    return {
      videoKey: "",
      enrollId: 0,
      courseId: 0,
      videoResponse: {} as VideoResponse,
      singleCourse: {} as Course,
      lessonList: new Array<Lesson>(),
      playerParams: { modestbranding: 1, rel: 0 },
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      EnrollService.buildPlayLink(obj)
        .then((res) => (this.videoResponse = res.data))
        .then(() => {
          this.videoKey = this.videoResponse.lesson.videokey;
          this.enrollId = this.videoResponse.enrollId;
          this.fetchSingleCourse(this.courseId);
          this.fetchLessonList(this.courseId, this.enrollId);
        })
        .catch((err) => this.handleError(err));
    },

    fetchSingleCourse(courseId: number) {
      CourseService.getById(courseId).then((res) => {
        this.singleCourse = res.data;
        document.title = `Lecture | ${this.singleCourse.title} | Wedemy`;
      });
    },

    fetchLessonList(courseId: number, enrollId: number) {
      LessonService.getWatchedList(courseId, enrollId).then(
        (res) => (this.lessonList = res.data)
      );
    },

    /* redirect to MyLearning  */
    handleError(err: any) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
    },

    handleChange(e: { data: number; target: any }) {
      if (e.data === 0) {
        let status: WatchStatus = {
          enrollId: this.enrollId,
          courseId: this.singleCourse.id,
          currentLessonId: this.videoResponse.lesson.id,
        };
        this.updateWatchStatus(status);
      }
    },

    /** play next video */
    refreshPlayer(lessonId: string) {
      var link = `/videoplayer/course/${this.singleCourse.id}/lesson/${lessonId}`;
      return window.location.replace(link);
    },

    /** send to server */
    updateWatchStatus(obj: WatchStatus) {
      EnrollService.updateStatus(obj)
        .then((res) => this.refreshPlayer(res.data.nextLessonId))
        .catch((err) => this.handleError(err));
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

.boldy {
  font-weight: bold;
}

.rowbig {
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

iframe[id^="vue-youtube-iframe-1"] {
  position: absolute;
  width: 100% !important;
  height: auto;
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

@media screen and (max-width: 770px) {
  .main-view {
    max-width: 100%;
    padding: 0;
    margin: 0;
  }

  .mycontainer {
    display: flex;
    flex-direction: column;
    max-width: 100% !important;
    overflow-x: hidden !important;
    height: 100%;
  }

  div[class="vue-youtube-iframe"] {
    max-width: 100% !important;
    width: 100% !important;
  }

  iframe[id^="vue-youtube-iframe-1"] {
    position: absolute;
    max-width: 100% !important;
    width: 100%;
    height: auto;
  }
  
  .rowsmall {
    display: block;
    height: fit-content;
  }

  .col1,
  .col2 {
    display: block;
    width: 100%;
  }

  .col1 {
    display: block;
    height: fit-content;
  }

  .col2 {
    display: block;
    height: 100%;
  }
}
</style>