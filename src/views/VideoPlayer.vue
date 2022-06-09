<template>
  <div class="main-view">
    <h3>{{ singleCourse.title }}</h3>
    <div class="mycontainer">
      <div class="col1">
        <el-row class="rowbig" v-if="videoKey.length">
          <youtube-iframe
            id="mamaPlayer"
            :video-id="videoKey"
            :player-width="980"
            :player-height="551"
            :no-cookie="true"
            @state-change="handleChange"
            :player-parameters="playerParams"
          ></youtube-iframe>
        </el-row>
        <div class="rowsmall">
          <el-col>
            <p class="biggy" v-if="videoKey.length">
              Lesson {{ videoResponse.lesson.lessonName }}
              <span>| {{ videoResponse.lesson.lengthSeconds }}</span>
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
import { Course, Lesson, VideoRequest, VideoResponse, WatchStatus } from "@/types";
import CourseService from "@/services/CourseService";
import EnrollService from "@/services/EnrollService";
import LessonService from "@/services/LessonService";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
  name: "VideoPlayer",
  data() {
    document.title = "Lecture | Wedemy";
    let playerParams: YT.PlayerVars = { modestbranding: 1, rel: 0 };
    return {
      videoKey: "",
      enrollId: 0,
      courseId: 0,
      videoResponse: {} as VideoResponse,
      singleCourse: {} as Course,
      lessonList: new Array<Lesson>(),
      playerParams,
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      LessonService.buildPlayLink(obj)
        .then((res) => (this.videoResponse = res.data))
        .then(() => {
          this.videoKey = this.videoResponse.lesson.videokey;
          this.enrollId = this.videoResponse.enrollId;
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
    redirectToPlayer(lessonId: string) {
      var link = `/videoplayer/course/${this.singleCourse.id}/lesson/${lessonId}`;
      return window.location.replace(link);
    },

    /** send to server */
    updateWatchStatus(obj: WatchStatus) {
      EnrollService.updateStatus(obj)
        .then((res) => this.redirectToPlayer(res.data.nextLessonId))
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

.rowbig {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
}

.rowbig,
#mamaPlayer {
  position: relative !important;
  width: 100% !important;
}

iframe {
  position: absolute !important;
  top: 0 !important;
  width: 100% !important;
  left: 0 !important;
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
  .rowbig,
  #mamaPlayer {
    width: 100%;
    position: relative;
    padding-top: 56.25%;
    margin-bottom: 2em;
    padding: 0;
  }
  iframe {
    width: 100% !important;
    height: unset;
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