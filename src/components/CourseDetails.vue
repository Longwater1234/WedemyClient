<template>
  <el-affix :offset="10" class="fixed-baby">
    <el-card shadow="hover" class="details-card">
      <div>
        <img
          :src="singleCourse.thumbUrl"
          class="small-img"
          :alt="singleCourse.title"
        />
      </div>
      <h1>${{ singleCourse.price }}</h1>
      <div class="btn-block">
        <el-button
          id="cart-btn"
          :loading="isLoading"
          class="btn purple"
          :class="{ black: InCart === true }"
          @click="emitCart(singleCourse.id)"
        >
          {{ getCartTitle }}
        </el-button>
        <el-button
          id="wishlist-btn"
          :class="{ pressed: InWishlist === true }"
          :title="getBtnTitle"
          @click="emitWishlist(singleCourse.id)"
          circle
        >
          {{ InWishlist ? "&#9829;" : "&#9825;" }}
          <!-- wishlist button -->
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
import { Star } from "@element-plus/icons";
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
    InWishlist: {
      type: Boolean,
      default: false,
    },
    InCart: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggleWishlist", "toggleCart"],
  methods: {
    /* emit events back to Parent, pass courseId */
    emitCart(id: number) {
      const self = this;
      if (!store.getters.isLoggedIn) return self.LoginMessage();
      this.$emit("toggleCart", id);
    },
    emitWishlist(id: number) {
      const self = this;
      if (!store.getters.isLoggedIn) return self.LoginMessage();
      this.$emit("toggleWishlist", id);
    },
    LoginMessage() {
      ElMessage.error("Must be logged in!");
      this.$router.push("/login");
    },
  },
  components: {
    Star,
  },
  computed: {
    getBtnTitle(): string {
      return this.InWishlist ? this.btnTitle[1] : this.btnTitle[0];
    },
    getCartTitle(): string {
      return this.InCart ? this.cartTitle[1] : this.cartTitle[0];
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

#wishlist-btn {
  width: auto;
  aspect-ratio: 1/1;
  font-size: 20px;
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