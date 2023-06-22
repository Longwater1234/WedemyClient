<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div class="home">
    <div class="banner-image">
      <div id="header-box">
        <h2 class="serif-head">Find the right fit</h2>
        <p>The topics you want, taught by real-world experts. Courses as low as $15.99</p>
        <form @submit.prevent="handleSearch">
          <el-input
            :suffix-icon="Search"
            native-type="search"
            v-model="searchItem"
            maxlength="40"
            placeholder="Search anything"
          >
          </el-input>
        </form>
      </div>
    </div>
    <!-- end of header banner -->

    <!-- START MAIN BODY -->
    <div class="main-body">
      <div v-if="store.getIsLoggedIn" style="margin-bottom: 2em">
        <h3 class="sub-heading">
          Hi {{ getFirst(store.fullname) }}! 👋 Pick up where you left off in
          <router-link to="/account/learning">My Learning</router-link>
        </h3>
      </div>

      <h2 class="serif-head">Students are viewing</h2>
      <h3 class="sub-heading">Expand your skillset with these courses</h3>

      <el-alert v-if="serverError" :title="serverError" type="error" :closable="false" />
      <!-- 
      <div ></div> -->

      <div v-loading="isLoading" class="course-box" :style="{ borderRadius: baseRadius }">
        <el-space direction="vertical" alignment="center" :size="30" style="margin-top: 2%; margin-left: 10%">
          <!-- START OF SINGLE CARD -->
          <el-space v-if="courses.length" wrap size="large">
            <el-card
              class="courseCard"
              :body-style="{ padding: '0px' }"
              shadow="hover"
              style="margin-bottom: 13px"
              v-for="course in courses"
              :key="course.id"
              @click="router.push(`/course/${course.id}`)"
            >
              <img :src="course.thumbUrl" class="product-img" :alt="course.title" />
              <div style="padding: 14px">
                <div class="card-title">{{ course.title }}</div>
                <div class="card-author">
                  <span>{{ course.author }}</span>
                </div>
                <!-- rating from users -->
                <el-rate
                  v-model="course.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value} rating"
                >
                </el-rate>
                <div>${{ course.price }}</div>
              </div>
            </el-card>
          </el-space>
        </el-space>
      </div>
      <!-- END OF SINGLE CARD -->

      <h2 class="serif-head">Top Categories</h2>
      <h3 class="sub-heading">Most Viewed by Students</h3>
      <div class="catArea">
        <div class="catSingle" v-for="(item, index) in topCategs" :key="index" @click="goToCategory(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CourseService from "@/service/CourseService";
import type { Course } from "@/interfaces/wedemy";
import { Search } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStudentStore } from "@/stores";

const router = useRouter();
const store = useStudentStore();

const searchItem = ref("");
const baseRadius = ref("var(--el-border-radius-base)");
const courses = ref<Course[]>([]);
const isLoading = ref(true);
const topCategs = reactive(["Development", "Music", "PhotoVideo", "Finance"]);
const serverError = ref("");

function fetchAllCourses() {
  CourseService.getTop()
    .then(res => (courses.value = res.data))
    .catch(error => (serverError.value = error.message))
    .finally(() => (isLoading.value = false));
}

function handleSearch() {
  if (!searchItem.value) return;
  if (searchItem.value.trim().length < 4) {
    return ElNotification({
      title: "Error",
      type: "error",
      duration: 2000,
      message: "Query too short"
    });
  }
  router.push({
    name: "SearchResults",
    query: { q: encodeURI(searchItem.value.trim()) },
    force: true
  });
}

// get first name only
function getFirst(input: string): string {
  if (!input) return "";
  return input.split(/\s/)[0];
}

function goToCategory(name: string) {
  router.push(`/category/${name}`);
}

onMounted(() => {
  document.title = "Home | Wedemy";
  window.scrollTo(0, 0);
  fetchAllCourses();
});
</script>

<style>
.main-body {
  margin: auto;
  width: 70% !important;
  padding: 1em;
}

.course-box {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-self: center;
  margin: auto;
  align-content: space-around;
  border: 1px solid var(--el-border-color-darker);
  border-radius: 30%;
}

.banner-image {
  height: 20em;
  aspect-ratio: 16 / 9;
  width: 100%;
  background: url("../assets/avi-richards-unsplash.jpg") center no-repeat;
  /* background-color: blueviolet; */
  overflow-x: hidden;
  overflow-y: hidden;
}

#header-box {
  text-align: left;
  color: aliceblue;
  padding-left: 10%;
  padding-top: 5%;
  width: 20%;
  height: 200px;
}

.courseCard {
  width: min-content;
  height: 20em;
}

.courseCard:hover {
  cursor: pointer;
}

.serif-head {
  font-family: Georgia, "Times New Roman", Times, serif;
}

.sub-heading {
  color: gray;
}

.catArea {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
}

.catSingle {
  width: 10em;
  font-weight: 700;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  text-align: center;
  align-items: baseline;
  padding: 2em;
  margin: 1em;
  border-radius: 1em;
}

.catSingle:hover {
  background-color: var(--primary);
  cursor: pointer;
  border: none;
  color: var(--vt-c-white-soft);
}

@media screen and (max-width: 770px) {
  #header-box {
    width: 60%;
  }

  .courseCard {
    height: 100%;
  }

  .catArea {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
}
</style>
