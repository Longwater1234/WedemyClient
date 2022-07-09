<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div v-loading.fullscreen.lock="isLoading" class="darkBox">
    <el-alert
      class="errorBox"
      v-if="errorMessage.length"
      :title="errorMessage"
      type="error"
      :closable="false"
    >
    </el-alert>

    <div v-if="!errorMessage" class="mainStart">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :to="{ path: '/category/' + singleCourse.category }"
          :style="{ color: 'white' }"
        >
          {{ singleCourse.category }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ singleCourse.title }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!--  START course info -->
      <img :src="singleCourse.thumbUrl" class="course-img" />
      <h1 class="courseTitle">{{ singleCourse.title }}</h1>
      <p class="courseSubtitle">{{ singleCourse.subtitle }}</p>
      <el-rate
        class="myrating"
        v-model="singleCourse.rating"
        disabled
        show-score
        score-template="{value} rating"
      >
      </el-rate>
      <h3 class="courseAuthor">Created by {{ singleCourse.author }}</h3>
    </div>
  </div>

  <!-- FLOATING CARD: COMPONENT -->
  <course-details
    v-if="!errorMessage"
    @toggleWishlist="onToggleWishlist"
    @toggleCart="onToggleCart"
    style="margin-top: -300px"
    :inWishlist="inWishlist"
    :isOwned="isOwned"
    :inCart="inCart"
    :singleCourse="singleCourse"
  >
  </course-details>
  <!-- END of CARD -->

  <!--  START OF objectives -->
  <div class="course-info" v-if="!errorMessage">
    <h2>What You'll Learn</h2>
    <div>
      <p class="obj-item" v-for="item in objectives" :key="item.id">
        &#10003; &nbsp;{{ item.objective }}
      </p>
    </div>
  </div>

  <!--  START OF lessons-->
  <div class="course-info" v-if="!errorMessage">
    <h2>Course Content</h2>
    <el-collapse v-model="activeName">
      <el-collapse-item
        :title="`${lessonCount} lectures in this course`"
        name="1"
      >
        <ul class="lessonlist">
          <li class="obj-item" v-for="item in lessons" :key="item.id">
            <lock v-if="!isOwned" style="width: 1em; height: 1em" />
            <caret-right v-else style="width: 1.5em" />
            {{ item.lessonName }}
            <i>({{ item.lengthSeconds }}) </i>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>

  <!--  START OF REVIEWS -->
  <div class="course-info" v-if="!errorMessage">
    <h2>Student Reviews</h2>
    <!-- REVIEW HEADER -->
    <el-row>
      <el-col :span="12">
        <div class="biggy">
          <star-filled style="width: 1em" />
          {{ singleCourse.rating }}
          <span>Rating</span>
        </div>
      </el-col>
      <el-col :span="12">
        Sort by:
        <el-select v-model="sortBy" @change="sortChanged">
          <el-option label="Date" value="createdAt" />
          <el-option label="Rating" value="rating" />
        </el-select>
      </el-col>
    </el-row>
    <!-- ACTUAL REVIEW LIST -->
    <div v-if="reviewList.length">
      <div v-for="item in reviewList" :key="item.id">
        <review-card :review="item" />
      </div>
      <div class="pager">
        <span style="margin-right: 0.5em">Page: &nbsp;{{ currentPage }}</span>
        <el-button-group>
          <el-button type="primary" :disabled="isFirst" @click="addPage(-1)">
            <el-icon> <arrow-left /> </el-icon>
            Prev Page
          </el-button>
          <el-button type="primary" :disabled="isLast" @click="addPage(1)">
            Next Page
            <el-icon> <arrow-right /> </el-icon>
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div v-else class="nodata">No reviews yet!</div>
  </div>

  <!-- FIXED AT BOTTOM ON MOBILE -->
  <mobile-details
    class="mobile-only"
    :isOwned="isOwned"
    :inCart="inCart"
    @toggleCart="onToggleCart"
    :singleCourse="singleCourse"
  >
  </mobile-details>
</template>

<script lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  CaretRight,
  Lock,
  StarFilled,
} from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import CourseService from "@/services/CourseService";
import LessonService from "@/services/LessonService";
import EnrollService from "@/services/EnrollService";
import ReviewService from "@/services/ReviewService";
import { Course, Lesson, Review } from "@/types";
import CourseDetails from "@/components/CourseDetails.vue";
import WishlistService from "@/services/WishlistService";
import CartService from "@/services/CartService";
import store from "@/store";
import { ElMessage, ElNotification } from "element-plus";
import ReviewCard from "@/components/ReviewCard.vue";
import MobileDetails from "@/components/MobileDetails.vue";

export default defineComponent({
  data() {
    document.title = "Course | Wedemy";

    return {
      activeName: "1",
      currentPage: 1,
      isFirst: true, //page
      isLast: false, //page
      sortBy: "createdAt",
      isLoading: false,
      errorMessage: "",
      courseId: 0,
      objectives: new Array<{ id: number; objective: string }>(),
      lessons: new Array<Lesson>(),
      inWishlist: false,
      inCart: false,
      isOwned: false,
      reviewList: new Array<Review>(),
      singleCourse: {} as Course,
      totalReviews: 0,
    };
  },
  components: {
    MobileDetails,
    CourseDetails,
    ReviewCard,
    Lock,
    CaretRight,
    ArrowLeft,
    ArrowRight,
    StarFilled,
  },
  methods: {
    fetchSingleCourse(courseId: number) {
      this.isLoading = true;
      CourseService.getById(courseId)
        .then((res) => {
          this.singleCourse = res.data;
          this.fetchReviewList(courseId, 0);
          document.title = `${this.singleCourse.title} | Wedemy`;
        })
        .catch((error) => (this.errorMessage = error.message))
        .finally(() => (this.isLoading = false));
    },
    fetchObjectives(courseId: number) {
      CourseService.getObjectivesByCourse(courseId).then((res) => {
        this.objectives = res.data;
      });
    },
    fetchLessonList(courseId: number) {
      LessonService.getLessonsByCourse(courseId).then(
        (res) => (this.lessons = res.data)
      );
    },

    /** GET ALL REVIEWS for course */
    fetchReviewList(courseId: number, pageIndex: number) {
      let sort = this.sortBy;
      ReviewService.getByCourse(courseId, pageIndex, sort).then((res) => {
        this.reviewList = res.data.content;
        this.isFirst = res.data.first;
        this.isLast = res.data.last;
      });
    },

    /** on pager click */
    addPage(value: number) {
      this.currentPage += value;
      this.fetchReviewList(this.courseId, this.currentPage - 1);
    },

    /** IF USER OWNS THIS COURSE */
    checkEnrollStatus(courseId: number) {
      const self = this;
      EnrollService.checkStatus(courseId)
        .then((res) => (self.isOwned = res.data.isOwned))
        .then(() => {
          if (self.isOwned) return;
          self.checkWishlistStatus(courseId);
          self.checkCartStatus(courseId);
        });
    },

    /** listen for event from Child */
    onToggleWishlist(courseId: number) {
      const self = this;
      let myAction = self.inWishlist
        ? WishlistService.removeOneByCourse(courseId)
        : WishlistService.addNew(courseId);
      myAction
        .then(() => (self.inWishlist = !self.inWishlist))
        .catch((error) => this.handleError(error));
    },

    /** If Course ALREADY in wishlist */
    checkWishlistStatus(courseId: number) {
      WishlistService.checkifWishlisted(courseId).then((res) => {
        this.inWishlist = res.data.inWishlist;
      });
    },

    /** listen for Event from Child */
    onToggleCart(courseId: number) {
      const self = this;
      let myAction = self.inCart
        ? CartService.removeOneByCourse(courseId)
        : CartService.addNew(courseId);
      myAction
        .then(() => self.handleSuccessCart(self.inCart))
        .catch((error) => self.handleError(error));
    },

    /** CHECK IF ALREADY IN CART */
    checkCartStatus(courseId: number) {
      CartService.checkItemInCart(courseId).then((res) => {
        this.inCart = res.data.inCart;
      });
    },

    /** AFTER ADDING TO CART */
    handleSuccessCart(inCart: boolean) {
      this.inCart = !inCart;
      store.getCartCountServer(); //refresh
      return ElNotification({
        type: "success",
        title: this.notifMessage,
        duration: 2000,
      });
    },

    /** on selected sort */
    sortChanged() {
      this.fetchReviewList(this.courseId, this.currentPage - 1);
    },

    handleError(err: any) {
      let mama = err.response ? err.response.data.message : err.message;
      ElMessage.error(mama);
    },
  },
  computed: {
    lessonCount(): number {
      return this.lessons.length;
    },
    notifMessage(): string {
      return this.inCart ? "Added to Cart" : "Removed from Cart";
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.isLoading = true;
    let { id } = this.$route.params;
    this.courseId = parseInt(id.toString());
    this.fetchSingleCourse(this.courseId);
    this.fetchObjectives(this.courseId);
    this.fetchLessonList(this.courseId);
    store.getters.isLoggedIn && this.checkEnrollStatus(this.courseId);
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
  border: 1px solid var(--el-border-color-darker);
}

.darkBox {
  background: var(--dark) center fixed;
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

.errorBox {
  margin: 2% auto;
  text-align: center;
  align-self: center;
  width: 100%;
  font-weight: bold;
}

ul.lessonlist {
  list-style-type: none;
  margin: 0 1em;
  padding: 0;
}

.myrating .el-rate__text {
  color: white;
}

.course-img {
  display: none;
}

.pager {
  margin-top: 1em;
}

.biggy {
  font-size: 24px;
  font-weight: 700;
  color: goldenrod;
}

@media screen and (max-width: 770px) {
  course-details {
    display: none;
  }

  .course-img {
    display: unset;
    aspect-ratio: 16/9;
    height: auto;
    width: 100%;
    transform: scale(1.1);
    margin-top: 2em;
  }

  .course-info {
    margin-left: 1%;
    width: unset;
  }

  .mainStart {
    margin: unset;
  }

  .courseTitle,
  .courseSubtitle {
    width: unset;
  }

  .obj-item {
    margin-bottom: 4%;
  }
}
</style>
