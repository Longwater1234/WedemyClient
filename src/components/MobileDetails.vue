<template>
  <div class="mobile-only actionbox">
    <div class="pricebox">${{ singleCourse.price }}</div>
    <div style="width: 80%">
      <div v-if="!isOwned" class="btn-block">
        <!-- CART BUTTON -->
        <el-button
          :loading="isLoading"
          class="btn purple"
          :class="{ black: inCart === true }"
          @click="emitCart(singleCourse?.id)"
        >
          {{ getCartTitle }}
        </el-button>
        <!-- WISHLIST BUTTON -->
        <el-button
          id="wishlist-btn"
          :class="{ pressed: inWishlist === true }"
          @click="emitWishlist(singleCourse?.id)"
          circle
        >
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

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import store from "@/store";
import { ElMessage } from "element-plus";
import { Course } from "@/types";

export default defineComponent({
  name: "MobileDetails",
  data() {
    return {
      isLoading: false,
      btnTitle: ["Add to Wishlist", "Remove from Wishlist"],
      cartTitle: ["Add to Cart", "Remove from Cart"],
    };
  },
  props: {
    singleCourse: {
      type: Object as PropType<Course>,
      default: {},
    },
    inCart: {
      type: Boolean,
      default: false,
    },
    inWishlist: {
      type: Boolean,
      default: false,
    },
    isOwned: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggleWishlist", "toggleCart"],
  methods: {
    /* emit events back to Parent */
    emitCart(id?: number) {
      if (!store.getters.isLoggedIn) return this.LoginMessage();
      this.$emit("toggleCart", id);
    },
    emitWishlist(id?: number) {
      if (!store.getters.isLoggedIn) return this.LoginMessage();
      this.$emit("toggleWishlist", id);
    },
    LoginMessage() {
      ElMessage.error("Must be logged in!");
      this.$router.push("/login");
    },
    goToCourse(id?: number) {
      this.$router.push({ name: "ResumeCourse", params: { courseId: id } });
    },
  },
  components: {
    ArrowRight,
  },
  computed: {
    getCartTitle(): string {
      return this.inCart ? this.cartTitle[1] : this.cartTitle[0];
    },
  },
});
</script>

<style scoped>
.actionbox,
.pricebox {
  display: none;
}

.pressed {
  color: red !important;
  border-color: red !important;
}

@media screen and (max-width: 770px) {
  .actionbox {
    display: flex;
    z-index: 1000;
    flex-direction: row;
    text-align: center;
    background-color: white;
    position: fixed;
    height: max-content;
    padding: 0.25em auto;
    bottom: 0.25em;
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
