<template>
  <div v-loading.fullscreen.lock="isLoading" class="darkBox">
    <div style="margin-top: 0px; width: 100%; font-weight: bold">
      <el-alert
        v-if="errorMessage.length"
        :title="errorMessage"
        type="error"
        :closable="false"
      >
      </el-alert>
    </div>
    <div v-if="!errorMessage.length" class="mainStart">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :to="{ path: '/category/' + singleCourse.category }"
          :style="{ color: 'white' }"
        >
          {{ singleCourse.category }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ singleCourse.title }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!--  start course view -->
      <h1 class="courseTitle">
        {{ singleCourse.title }}
      </h1>
      <p class="courseSubtitle">
        {{ singleCourse.subtitle }}
      </p>
      <el-rate
        v-model="singleCourse.rating"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} rating"
      >
      </el-rate>
      <h3 class="courseAuthor">Created by {{ singleCourse.author }}</h3>
    </div>
  </div>
  <!-- floaty card -->
  <course-details
    style="margin-top: -300px"
    :singleCourse="singleCourse"
  ></course-details>
  <!--  START OF details-->
  <div class="course-info">
    <h2>What You'll Learn</h2>
    <ul>
      <li class="obj-item" v-for="item in objectives" :key="item.id">
        &#10003; &nbsp;{{ item.objective }}
      </li>
    </ul>
  </div>
  <!--  START OF lessons-->
  <div class="course-info">
    <h2>Course Content</h2>
    <el-collapse v-model="activeName">
      <el-collapse-item
        :title="`${lessonCount} lectures in this course`"
        name="1"
      >
        <ul class="lessonlist">
          <li class="obj-item" v-for="item in lessons" :key="item.id">
            <lock style="width: 1em; height: 1em" /> {{ item.lessonName }}
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
  <!-- START OF REVIEWS BELOW -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CourseService from "@/services/CourseService";
import LessonService from "@/services/LessonService";
import { Lesson } from "@/types";
import CourseDetails from "@/components/CourseDetails.vue";
import { Lock } from "@element-plus/icons";

export default defineComponent({
  data() {
    document.title = "Course | Wedemy";
    return {
      activeName: "1",
      isLoading: false,
      errorMessage: "",
      courseId: 0,
      objectives: new Array<String>(),
      lessons: new Array<Lesson>(),
      singleCourse: {
        title: "",
        subtitle: "",
        author: "",
        price: 0,
        rating: 4.5,
        thumbUrl: "",
        category: "",
      },
    };
  },
  components: {
    CourseDetails,
    Lock,
  },
  methods: {
    fetchSingleCourse(courseId: number) {
      this.isLoading = true;
      CourseService.getById(courseId)
        .then((res) => {
          this.singleCourse = res.data;
          document.title = `${this.singleCourse.title} | Wedemy`;
        })
        .catch((error) => (this.errorMessage = error.message))
        .finally(() => (this.isLoading = false));
    },
    fetchObjectives(courseId: number) {
      CourseService.getObjectivesbyCourse(courseId).then((res) => {
        this.objectives = res.data;
      });
    },
    fetchLessonList(courseId: number) {
      LessonService.getLessonsByCourse(courseId).then(
        (res) => (this.lessons = res.data)
      );
    },
  },
  computed: {
    lessonCount(): number {
      return this.lessons.length 
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.isLoading = true;
    let { id } = this.$route.params;
    this.courseId = parseInt(id.toString());
    this.fetchSingleCourse(this.courseId);
    this.fetchObjectives(this.courseId);
    this.fetchLessonList(this.courseId);
  },
});
</script>

<style>
.mainStart {
  margin: 0 2% 2% 5%;
  padding: 2em;
}

.course-info {
  margin: 0 2% 2% 7%;
  width: 50%;
  padding: 1em;
  border: 1px solid var(--el-border-color-base);
}

.darkBox {
  background: #1c1d1f center fixed;
  width: 100%;
  color: white;
  height: 20%;
}

.courseSubtitle {
  font-size: 18px;
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  word-break: normal;
}

.courseTitle {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
}

.el-breadcrumb__inner.is-link {
  color: var(--primary);
}

.obj-item {
  margin-bottom: 2%;
}

ul.lessonlist {
  list-style-type: none;
  margin: 0 1em;
  padding: 0;
}
</style>