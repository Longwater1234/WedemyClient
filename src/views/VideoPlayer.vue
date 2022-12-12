<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div class="main-view">
    <h3>{{ singleCourse.title }}</h3>
    <div class="mycontainer">
      <div class="col-1">
        <!-- LEFT PANEL, video frame  -->
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
            <p class="lessonTitle" v-if="videoKey.length">
              Lesson {{ videoResponse.lesson.lessonName }}
              <span>| {{ videoResponse.lesson.lengthSeconds }}</span>
            </p>
            <p class="full-only">{{ singleCourse.subtitle }}</p>
            <div>
              <el-button type="primary" @click="toggleReviewDialog()">
                {{ review ? "Edit your review" : "Post a review" }}
                <el-icon>
                  <Edit />
                </el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL, LESSON PLAYLIST -->
      <div class="col-2">
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
                    {{ item.video_time }}
                  </div>
                </div>
                <div>
                  <input type="checkbox" :checked="item.is_watched" disabled />
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <!--   BEGIN DIALOG FOR REVIEW-->
    <el-dialog v-model="dialogShow" title="Leave Review for Course">
      <el-form :model="formReview" @submit.prevent="postReview">
        <el-form-item label="Your Rating">
          <el-rate v-model="formReview.rating" show-text text-color="#000000" />
        </el-form-item>
        <el-form-item label="Content">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="300"
            show-word-limit
            v-model="formReview.content"
          />
        </el-form-item>
        <div style="width: 50%; display: flex; justify-content: center">
          <el-button native-type="submit" :loading="isLoading" type="primary">
            Submit Review
          </el-button>
        </div>
      </el-form>
    </el-dialog>
    <!--    END OF DIALOG-->
  </div>
</template>

<script lang="ts">
import {
  Course,
  CustomLesson,
  Review,
  VideoRequest,
  VideoResponse,
  WatchStatus,
} from "@/types";
import CourseService from "@/services/CourseService";
import EnrollService from "@/services/EnrollService";
import LessonService from "@/services/LessonService";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";
import { Clock, Edit } from "@element-plus/icons-vue";
import ReviewService from "@/services/ReviewService";
import { AxiosError, AxiosResponse } from "axios";

export default defineComponent({
  name: "VideoPlayer",
  data() {
    document.title = "Lecture | Wedemy";
    return {
      activeName: "99",
      videoKey: "",
      dialogShow: false,
      enrollId: 0,
      courseId: 0,
      lessonId: "",
      videoResponse: {} as VideoResponse,
      singleCourse: {} as Course,
      lessonList: new Array<CustomLesson>(),
      status: {} as WatchStatus,
      playerParams: { modestbranding: 1, rel: 0 } as YT.PlayerVars,
      isLoading: false,
      review: {} as Review,
      formReview: {
        id: 0,
        rating: 0,
        content: "",
        courseId: 0,
      },
      errorMsg: "",
    };
  },
  methods: {
    getPlayLink(obj: VideoRequest) {
      EnrollService.buildPlayLink(obj)
        .then((res) => (this.videoResponse = res.data))
        .then(() => {
          this.setVideoInfo(this.videoResponse);
          this.fetchSingleCourse(this.courseId);
          this.fetchMyLessons(this.courseId, this.enrollId);
        })
        .catch((err) => this.handleError(err));
    },

    fetchSingleCourse(courseId: number) {
      CourseService.getById(courseId).then((res) => {
        this.singleCourse = res.data;
        document.title = `Lecture | ${this.singleCourse.title} | Wedemy`;
      });
    },

    fetchMyLessons(courseId: number, enrollId: number) {
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
    handleError(err: AxiosError) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
    },

    /** on Success review post */
    handleOKReview(res: AxiosResponse) {
      this.getMyReview(this.courseId);
      this.dialogShow = false;
      ElMessage.success(res.data.message);
    },

    /** YT iframe listener */
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

    /** either EDIT or ADD NEW  */
    postReview() {
      this.formReview.courseId = this.courseId;
      let review = this.formReview;
      this.isLoading = true;
      this.toggleReviewDialog();
      let service = this.formReview.id
        ? ReviewService.editMine(review.id, review)
        : ReviewService.addNew(review);

      service
        .then((res) => this.handleOKReview(res))
        .catch((err) => this.handleError(err))
        .finally(() => (this.isLoading = false));
    },

    /** play next video */
    refreshPlayer(lessonId: string) {
      let link = `/videoplayer/course/${this.singleCourse.id}/lesson/${lessonId}`;
      return window.location.replace(link);
    },

    toggleReviewDialog() {
      this.dialogShow = !this.dialogShow;
      this.errorMsg = "";
    },

    /** send update to server */
    updateWatchStatus(obj: WatchStatus) {
      EnrollService.updateStatus(obj)
        .then((res) => {
          let nextLessonId = res.data.nextLessonId;
          if (!nextLessonId) {
            ElMessage.success(res.data.message);
            this.$router.replace({ name: "MyLearning" });
            return;
          }
          this.refreshPlayer(nextLessonId);
        })
        .catch((err) => this.handleError(err));
    },

    /** jump to clicked lesson */
    goToLesson(id: string) {
      this.lessonId = id;
      this.refreshPlayer(id);
    },

    /* get single review */
    getMyReview(courseId: number) {
      ReviewService.getMineOnCourse(courseId)
        .then((res) => (this.review = res.data))
        .then(() => {
          if (this.review) {
            this.formReview = { ...this.review };
          }
        });
    },
  },
  components: {
    Clock,
    Edit,
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
    this.getMyReview(this.courseId);
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
.col-1 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 70%;
}
.col-2 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30%;
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
.lessonTitle {
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
  justify-content: space-between;
  padding: 0.5em 0.5em 1em;
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
.el-dialog {
  width: 30% !important;
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
  .col-1,
  .col-2 {
    display: block;
    width: 100%;
  }
  .col-1 {
    display: block;
    height: fit-content;
  }
  .col-2 {
    display: block;
    height: 100%;
  }
  .el-dialog {
    width: 100% !important;
  }
}
</style>
