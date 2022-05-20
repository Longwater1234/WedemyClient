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

      <!--  START course view -->
      <h1 class="courseTitle">{{ singleCourse.title }}</h1>
      <p class="courseSubtitle">{{ singleCourse.subtitle }}</p>
      <el-rate
        v-model="singleCourse.rating"
        disabled
        show-score
        text-color="#ffffff"
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
    :InWishlist="InWishlist"
    :IsOwned="isOwned"
    :InCart="InCart"
    :singleCourse="singleCourse"
  >
  </course-details>
  <!-- END of FLOATING CARD -->

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
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
  <!-- TODO: START OF REVIEWS BELOW -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CourseService from "@/services/CourseService";
import LessonService from "@/services/LessonService";
import EnrollService from "@/services/EnrollService";
import { Lesson } from "@/types";
import CourseDetails from "@/components/CourseDetails.vue";
import { CaretRight, Lock } from "@element-plus/icons-vue";
import WishlistService from "@/services/WishlistService";
import CartService from "@/services/CartService";
import store from "@/store";
import { ElMessage, ElNotification } from "element-plus";

export default defineComponent({
  data() {
    document.title = "Course | Wedemy";
    return {
      activeName: "1",
      isLoading: false,
      errorMessage: "",
      courseId: 0,
      objectives: new Array<{ id: number; objective: string }>(),
      lessons: new Array<Lesson>(),
      InWishlist: false,
      InCart: false,
      isOwned: false,
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
    CaretRight,
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

    /** IF USER OWNS THIS COURSE */
    checkEnrollStatus(courseId: number) {
      let self = this;
      EnrollService.checkStatus(courseId)
        .then((res) => (self.isOwned = res.data.isOwned))
        .then(() => {
          if (self.isOwned) return;
          self.checkWishlistStatus(courseId);
          self.checkCartStatus(courseId);
        });
    },

    /* listen for event from Child */
    onToggleWishlist(courseId: number) {
      const self = this;
      let myAction = self.InWishlist
        ? WishlistService.removeOneByCourse(courseId)
        : WishlistService.addNew(courseId);
      myAction
        .then(() => (self.InWishlist = !self.InWishlist))
        .catch((error) => this.handleError(error));
    },

    /** IF this course ALREADY wishlist */
    checkWishlistStatus(courseId: number) {
      WishlistService.checkifWishlisted(courseId).then((res) => {
        this.InWishlist = res.data.inWishlist;
      });
    },

    /* listen for Event from Child */
    onToggleCart(courseId: number) {
      const self = this;
      let myAction = self.InCart
        ? CartService.removeOneByCourse(courseId)
        : CartService.addNew(courseId);
      myAction
        .then(() => self.handleSuccessCart(self.InCart))
        .catch((error) => self.handleError(error));
    },

    /** CHECK IF ALREADY IN CART */
    checkCartStatus(courseId: number) {
      CartService.checkItemInCart(courseId).then((res) => {
        this.InCart = res.data.inCart;
      });
    },

    /** AFTER ADDING TO CART */
    handleSuccessCart(InCart: boolean) {
      this.InCart = !InCart;
      store.getCartCountServer(); //refresh
      return ElNotification({
        type: "success",
        title: this.notifMessage,
        duration: 2500,
      });
    },

    /** ERROR FROM ANYTHING */
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
      return this.InCart ? "Added to Cart" : "Removed from Cart";
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

.el-rate__text {
  color: white;
}

@media screen and (max-width: 770px) {
  course-details {
    display: none;
  }
}
</style>