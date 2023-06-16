<template>
  <div class="mobile-only actionbox">
    <div class="pricebox">${{ singleCourse.price }}</div>
    <div style="width: 80%">
      <div v-if="!isOwned" class="btn-block">
        <!-- CART BUTTON -->
        <el-button
          :loading="isLoading"
          class="btn purple"
          :class="{ black: inCart }"
          @click="emitCart(singleCourse?.id)"
        >
          {{ getCartTitle }}
        </el-button>
        <!-- WISHLIST BUTTON -->
        <el-button id="wishlist-btn" :class="{ pressed: inWishlist }" @click="emitWishlist(singleCourse?.id)" circle>
          {{ inWishlist ? "&#9829;" : "&#9825;" }}
          <!-- wishlist button -->
        </el-button>
      </div>
      <!-- ELSE, direct to LESSONS -->
      <div v-else>
        <el-button class="black btn" @click="goToCourse(singleCourse?.id)">
          Continue Learning
          <arrow-right class="myarrow" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import type { PropType } from "vue";
import { ElMessage } from "element-plus";
import type { Course } from "@/interfaces/wedemy";
import { useStudentStore } from "@/stores";
import { useRouter } from "vue-router";

const isLoading = ref(false);
const cartTitle = reactive(["Add to Cart", "Remove from Cart"]);
const store = useStudentStore();
const router = useRouter();

const props = defineProps({
  singleCourse: {
    type: Object as PropType<Partial<Course>>,
    required: true
  },
  inCart: {
    type: Boolean,
    default: false
  },
  inWishlist: {
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
const emitCart = (id?: number) => {
  if (!store.loggedIn) return loginMessage();
  emits("toggleCart", id);
};

// emit Wishlist event to Parent
const emitWishlist = (id?: number) => {
  if (!store.loggedIn) return loginMessage();
  emits("toggleWishlist", id);
};

function loginMessage() {
  ElMessage.error("Must be logged in!");
  router.push("/login");
}

function goToCourse(id?: number) {
  router.push({ name: "ResumeCourse", params: { courseId: id } });
}

const getCartTitle = computed(() => {
  return props.inCart ? cartTitle[1] : cartTitle[0];
});
</script>

<style scoped lang="scss">
.actionbox,
.pricebox {
  display: none;
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

@media screen and (max-width: 770px) {
  .actionbox {
    display: flex;
    z-index: 1000;
    flex-direction: row;
    text-align: center;
    background-color: white;
    justify-content: center;
    position: fixed;
    height: max-content;
    padding: 0.5em 0;
    bottom: 0;
    width: 100%;
  }

  .btn {
    width: 80%;
  }

  .pricebox {
    display: unset;
    width: 20%;
    margin-top: 0.3em;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
