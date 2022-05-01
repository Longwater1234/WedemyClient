<template>
  <div class="home">
    <div class="banner-image">
      <div id="header-box">
        <h2 class="serif-head">Find the right fit</h2>
        <p>
          The topics you want, taught by real-world experts. Courses as low as
          $15.99
        </p>
        <form @submit.prevent="handleSearch">
          <el-input
            :suffix-icon="Search"
            native-type="search"
            type="search"
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
      <h2 class="serif-head">Recommended for you</h2>
      <h3 class="sub-heading">Expand your skillset with these courses</h3>

      <el-alert
        v-if="serverError"
        :title="serverError"
        type="error"
        :closable="false"
      >
      </el-alert>

      <div v-loading="isLoading"></div>

      <div class="course-box" :style="{ borderRadius: baseRadius }">
        <el-space
          direction="vertical"
          alignment="start"
          :size="30"
          style="margin-top: 2%; margin-left: 10%"
        >
          <!-- START OF SINGLE CARD -->
          <el-space v-if="courses.length" wrap size="large">
            <el-card
              class="courseCard"
              :body-style="{ padding: '0px' }"
              shadow="hover"
              style="margin-bottom: 13px"
              v-for="course in courses"
              :key="course.id"
              @click="goToCourse(course.id)"
            >
              <img
                :src="course.thumbUrl"
                class="product-img"
                :alt="course.title"
              />
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
      <div class="categArea">
        <div
          class="categSingle"
          v-for="(item, index) in topCategs"
          :key="index"
          @click="goToCategory(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CourseService from "@/services/CourseService";
import { Course } from "@/types";
import { Search } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { defineComponent, markRaw } from "vue";

export default defineComponent({
  name: "Home",
  inject: ["store"],
  data() {
    document.title = "Home | Wedemy";
    const courses = new Array<Course>();
    return {
      searchItem: "",
      baseRadius: "var(--el-border-radius-base)",
      courses,
      Search: markRaw(Search),
      isLoading: true,
      topCategs: ["Development", "Music", "PhotoVideo", "Finance"],
      serverError: "",
    };
  },
  methods: {
    fetchAllCourses() {
      CourseService.getTop()
        .then((res) => (this.courses = res.data))
        .catch((error) => (this.serverError = error.message))
        .finally(() => (this.isLoading = false));
    },
    handleSearch() {
      if (!this.searchItem) return;
      if (this.searchItem.trim().length < 4) {
        return ElNotification({
          title: "Error",
          type: "error",
          duration: 2000,
          message: "Query too short",
        });
      }
      this.$router.push({
        name: "SearchResults",
        query: { q: encodeURI(this.searchItem.trim()) },
        force: true,
      });
    },
    goToCourse(id: number) {
      this.$router.push(`/course/${id}`);
    },
    goToCategory(name: string) {
      this.$router.push(`/category/${name}`);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchAllCourses();
  },
});
</script>

<style>
.main-body {
  margin: 2%;
  width: 70%;
  margin: auto auto;
  padding: 1em;
}

.course-box {
  display: flex;
  align-self: center;
  margin: auto auto;
  align-content: space-around;
  border: 0.5px solid var(--el-border-color-darker);
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
  width: 285px;
  height: 300px;
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

.categArea {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
}

.categSingle {
  width: 10em;
  font-weight: 700;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  text-align: center;
  align-items: baseline;
  padding: 2em;
  margin: 1em;
  border-radius: 1em;
}

.categSingle:hover {
  background-color: var(--primary);
  cursor: pointer;
  border: none;
  color: var(--background);
}

@media screen and (max-width: 770px) {
  #header-box {
    width: 60%;
  }

  .courseCard {
    height: 100%;
  }

  .flex {
    display: block;
  }

  .categArea {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
}
</style>
