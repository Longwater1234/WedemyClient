<template>
  <div class="mobile-only actionbox">
    <div class="pricebox">${{ singleCourse.price }}</div>
    <div style="width: 80%">
      <div v-if="!isOwned" class="btn-block">
        <el-button
          :loading="isLoading"
          class="btn purple"
          :class="{ black: inCart === true }"
          @click="emitCart(singleCourse.id)"
        >
          {{ getCartTitle }}
        </el-button>
      </div>
      <!-- ELSE, direct to LESSONS -->
      <div v-else>
        <el-button class="black btn" @click="goToCourse(singleCourse.id)">
          Continue Learning
          <arrow-right class="myarrow" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import store from "@/store";
import { ElMessage } from "element-plus";

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
      type: Object,
      default: {},
    },
    inCart: {
      type: Boolean,
      default: false,
    },
    isOwned: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggleCart"],
  methods: {
    /* emit events back to Parent */
    emitCart(id: number) {
      if (!store.getters.isLoggedIn) return this.LoginMessage();
      this.$emit("toggleCart", id);
    },
    LoginMessage() {
      ElMessage.error("Must be logged in!");
      this.$router.push("/login");
    },
    goToCourse(id: number) {
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

@media screen and (max-width: 770px) {
  .actionbox {
    display: flex;
    flex-direction: row;
    text-align: center;
    background-color: white;
    position: fixed;
    height: 3em;
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
