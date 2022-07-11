<template>
  <el-affix :offset="10" class="fixed-baby full-only">
    <el-card shadow="hover" class="details-card">
      <div>
        <img
          :src="singleCourse.thumbUrl"
          class="small-img"
          :alt="singleCourse.title"
        />
      </div>
      <h1>${{ singleCourse.price }}</h1>

      <!-- IF NOT OWN COURSE, show CART + WISHLIST Btn -->
      <div v-if="!isOwned" class="btn-block">
        <!-- CART BUTTON -->
        <el-button
          id="cart-btn"
          :loading="isLoading"
          class="btn purple"
          :class="{ black: inCart === true }"
          @click="emitCart(singleCourse.id)"
        >
          {{ getCartTitle }}
        </el-button>
        <!-- WISHLIST BUTTON -->
        <el-button
          id="wishlist-btn"
          :class="{ pressed: inWishlist === true }"
          :title="getBtnTitle"
          @click="emitWishlist(singleCourse.id)"
          circle
        >
          {{ inWishlist ? "&#9829;" : "&#9825;" }}
          <!-- wishlist button -->
        </el-button>
      </div>

      <!-- ELSE, direct to LESSONS -->
      <div v-else>
        <p class="grey-sub">You already own this course</p>
        <el-button class="black btn" @click="goToCourse(singleCourse.id)">
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

<script lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import store from "@/store";
import { ElMessage } from "element-plus";

export default defineComponent({
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
    inWishlist: {
      type: Boolean,
      default: false,
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
  emits: ["toggleWishlist", "toggleCart"],
  methods: {
    /* emit events back to Parent, pass courseId */
    emitCart(id: number) {
      if (!store.getters.isLoggedIn) return this.LoginMessage();
      this.$emit("toggleCart", id);
    },
    emitWishlist(id: number) {
      if (!store.getters.isLoggedIn) return this.LoginMessage();
      this.$emit("toggleWishlist", id);
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
    getBtnTitle(): string {
      return this.inWishlist ? this.btnTitle[1] : this.btnTitle[0];
    },
    getCartTitle(): string {
      return this.inCart ? this.cartTitle[1] : this.cartTitle[0];
    },
  },
  mounted() {},
});
</script>

<style>
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