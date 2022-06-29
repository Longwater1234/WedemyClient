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
            <p class="full-only">{{ singleCourse.subtitle }}</p>
          </div>
        </div>
      </div>
      <div class="col2">
        <h3>Lessons</h3>
        <el-collapse v-model="activeName">
          <el-collapse-item name="99">
            <div class="lessonlist">
              <div
                class="lesson-item"
                :class="{ bkg: item.id === lessonId }"
                v-for="item in lessonList"
                @click="goToLesson(item.id)"
                :key="item.id"
              >
                <div>
                  <div>{{ item.lesson_name }}</div>
                  <div>
                    <clock class="videolen" />
                    {{ item.fmt_time }}
                  </div>
                </div>
                <div>
                  <input type="checkbox" :checked="item.isWatched" disabled />
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
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
import { Clock } from "@element-plus/icons-vue";

export default defineComponent({
  name: "VideoPlayer",
  data() {
    document.title = "Lecture | Wedemy";
    return {
      activeName: "99",
      videoKey: "",
      enrollId: 0,
      courseId: 0,
      lessonId: "",
      videoResponse: {} as VideoResponse,
      singleCourse: {} as Course,
      lessonList: new Array<Lesson>(),
      status: {} as WatchStatus,
      playerParams: { modestbranding: 1, rel: 0 },
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      EnrollService.buildPlayLink(obj)
        .then((res) => (this.videoResponse = res.data))
        .then(() => {
          this.setVideoInfo(this.videoResponse);
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

    setVideoInfo(response: VideoResponse) {
      this.videoKey = response.lesson.videokey;
      this.lessonId = response.lesson.id;
      this.enrollId = response.enrollId;
    },

    /* display error  */
    handleError(err: any) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
    },

    /** YT iframe events */
    handleChange(e: { data: number; target: any }) {
      if (e.data === 0) {
        //end of video
        this.status = {
          enrollId: this.enrollId,
          courseId: this.singleCourse.id,
          currentLessonId: this.videoResponse.lesson.id,
        };
        this.updateWatchStatus(this.status);
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

    /** jump to clicked lesson */
    goToLesson(id: string) {
      this.lessonId = id;
      this.refreshPlayer(id);
    },
  },
  components: {
    Clock,
  },
  mounted() {
    let { courseId, lessonId } = this.$route.params;
    let numCourseId = parseInt(courseId.toString());
    let req: VideoRequest = {
      courseId: numCourseId,
      lessonId: lessonId.toString(),
    };
    this.courseId = numCourseId;
    this.getPlayLink(req);
  },
});
</script>

<style scoped>
.mycontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
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

.videolen {
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
}

.lesson-item {
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  justify-content: space-between;
  padding-bottom: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.lesson-item:hover {
  background: whitesmoke;
  cursor: pointer;
}

.bkg {
  background: var(--primary);
  font-weight: 700;
  color: white;
}
.bkg:hover {
  background: var(--secondary);
  color: white;
}

@media screen and (max-width: 1000px) {
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