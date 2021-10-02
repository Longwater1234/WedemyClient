<template>
  <div class="wrapper">
    <img
      src="../images/al-ghazali.jpg"
      alt="home"
      class="home-image"
      rel="preload"
      as="image"
    />

    <div class="home main-view" style="margin-top: 40px">
      <h1>View some of our finest courses</h1>

      <div class="home-view" style="margin-top: 20px">
        <h3>Recommended for you</h3>

        <div style="margin-top: 2%">
          <div class="server-error" v-if="serverError.length">
            {{ serverError }}
          </div>
          <div v-loading="loading"></div>
        </div>

        <!-- category catalog -->
        <!-- <router-link to="/course" style="text-decoration: none"> -->
        <el-space
          direction="vertical"
          alignment="start"
          :size="30"
          style="margin-top: 20px; margin-left: 20px"
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
        <!-- END OF SINGLE CARD -->
      </div>

      <!-- top categories -->
      <div style="margin-top: 40px">
        <h1>Top Categories</h1>

        <div class="flex top">
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            style="margin-right: 25px"
            v-for="o in 4"
            :key="o"
            class="top-img"
          >
            <img src="../images/1613872731202.webp" class="top-image" />
            <div style="padding: 14px">
              <span class="card-title">Category</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CourseService from "../services/CourseService";
import { defineComponent } from "vue";
import axiosconfig from "@/axiosconfig";

export default defineComponent({
  name: "Home",
  data() {
    document.title = "Home | Wedemy";

    return {
      courses: [],
      serverError: "",
      loading: true,
    };
  },
  methods: {
    fetchAllCourses() {
      CourseService.getAll()
        .then((res) => {
          this.courses = res.data;
          axiosconfig.defaults.xsrfHeaderName = "X-XSRF-TOKEN"
        })
        .catch((error) => {
          this.serverError = error.message;
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goToCourse(id: number) {
      this.$router.push(`/course/${id}`);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchAllCourses();
  },
});
</script>

<style>
.home-image {
  width: 100%;
}

.home-view {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 26px;
}

.home-section2 {
  border: 1px solid #dcdacb;
  width: 100%;
  /* height: 20%; */
  padding: 2%;
}

.top {
  /* justify-content: space-between; */
  margin-right: -1.6rem;
}

/* .top-img {
  width: 80%;
  height: 100%;
} */
.top-img {
  width: 90vw;
  height: auto;
}

.top-image {
  width: 100%;
}

.server-error {
  color: red;
}

.courseCard {
  width: 285px;
}

@media only screen and (max-width: 600px) {
  .home-image {
    width: 100%;
    height: 150px;
  }

  .flex {
    display: block;
  }

  .courseCard {
    width: 80vw;
  }
}
</style>

