<template>
  <el-affix :offset="10" class="fixed-baby full-only">
    <el-card shadow="hover" class="details-card">
      <div>
        <img :src="props.singleCourse?.thumbUrl" class="small-img" :alt="singleCourse?.title" />
      </div>
      <h1>${{ singleCourse.price }}</h1>

      <!-- IF NOT OWN COURSE, show CART + WISHLIST Btn -->
      <div v-if="!isOwned" class="btn-block">
        <!-- CART BUTTON -->
        <el-button
          id="cart-btn"
          :loading="isLoading"
          class="btn purple"
          :class="{ black: inCart }"
          @click="emitCart(singleCourse?.id)"
        >
          {{ getCartTitle }}
        </el-button>
        <!-- WISHLIST BUTTON -->
        <el-button
          id="wishlist-btn"
          :class="{ pressed: inWishlist }"
          :title="getBtnTitle"
          @click="emitWishlist(singleCourse?.id)"
          circle
        >
          {{ inWishlist ? "&#9829;" : "&#9825;" }}
          <!-- wishlist button -->
        </el-button>
      </div>

      <!-- ELSE, direct to LESSONS -->
      <div v-else>
        <p class="grey-sub">You already own this course</p>
        <el-button class="black btn" @click="goToCourse(singleCourse?.id)">
          Continue Learning <arrow-right class="myarrow" />
        </el-button>
      </div>

      <div>
        <h4>This course includes:</h4>
        <ul style="padding-left: 20px">
          <li class="obj-item">Full lifetime access</li>
          <li class="obj-item">Access on mobile and TV</li>
          <li class="obj-item">Certificate of completion</li>
        </ul>
      </div>
    </el-card>
  </el-affix>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { computed, reactive, ref } from "vue";
import type { PropType } from "vue";
import { ElMessage } from "element-plus";
import { useStudentStore } from "@/stores";
import { useRouter } from "vue-router";
import type { Course } from "@/interfaces/wedemy";

const isLoading = ref(false);
const btnTitle = reactive(["Add to Wishlist", "Remove from Wishlist"]);
const cartTitle = reactive(["Add to Cart", "Remove from Cart"]);

const studentStore = useStudentStore();
const router = useRouter();

const props = defineProps({
  singleCourse: {
    type: Object as PropType<Partial<Course>>,
    required: false
  },
  inWishlist: {
    type: Boolean,
    default: false
  },
  inCart: {
    type: Boolean,
    default: false
  },
  isOwned: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits<{
  (event: "toggleWishlist", id?: number): void;
  (event: "toggleCart", id?: number): void;
}>();

// emit Cart event back to Parent
function emitCart(id?: number) {
  if (!studentStore.loggedIn) return loginMessage();
  emits("toggleCart", id);
}

//emit Wishlist event to Parent
function emitWishlist(id?: number) {
  if (!studentStore.loggedIn) return loginMessage();
  emits("toggleWishlist", id);
}

function loginMessage() {
  ElMessage.error("Must be logged in!");
  router.push("/login");
}

function goToCourse(id?: number) {
  router.push({ name: "ResumeCourse", params: { courseId: id } });
}

const getBtnTitle = computed(() => {
  return props.inWishlist ? btnTitle[1] : btnTitle[0];
});

const getCartTitle = computed(() => {
  return props.inCart ? cartTitle[1] : cartTitle[0];
});
</script>

<style scoped>
.fixed-baby {
  width: 40%;
  float: right;
  text-align: start;
  top: 0;
}

.myarrow {
  width: 1em;
  color: white;
  margin-right: 20px;
}

.details-card {
  width: max-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#cart-btn {
  width: 80% !important;
}

.pressed {
  color: red !important;
  border-color: red !important;
}

.black {
  background-color: black !important;
  font-weight: 700 !important;
  color: white !important;
}

.black:hover {
  background-color: rgb(26, 26, 26) !important;
  color: white !important;
}

.grey-sub {
  text-align: center;
}

#wishlist-btn {
  width: 1.5em;
  height: 1.5em;
  margin-top: 3px;
  aspect-ratio: 1/1;
  font-size: 1.5em;
  border-radius: 50%;
}

.small-img {
  height: 200px;
  aspect-ratio: 16/9;
  margin: auto;
}

.btn-block {
  display: flex;
  flex-direction: row;
}
</style>
