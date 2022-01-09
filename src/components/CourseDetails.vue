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
          @click="addToCart(singleCourse.id)"
        >
          Add to Cart
        </el-button>
        <el-button
          id="wishlist-btn"
          :class="{ pressed: InWishlist === true }"
          :title="setBtnTitle"
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
import WishlistService from "@/services/WishlistService";
import { Star } from "@element-plus/icons";
import { defineComponent } from "vue";
import store from "@/store";
import { ElMessage } from "element-plus";

export default defineComponent({
  data() {
    return {
      isLoading: false,
      InCart: false,
      btnTitle: ["Add to Wishlist", "Remove from Wishlist"],
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
  },
  emits: ["toggleWishlist"],
  methods: {
    addToCart(id: number) {
      //TODO complete task
    },
     // emit event back to Parent, pass courseId
    emitWishlist(id: number) {
      const self = this;
      if (!store.getters.isLoggedIn) return self.LoginMessage();
      this.$emit("toggleWishlist", id);
    },
    LoginMessage() {
      ElMessage.error("Must be logged in");
    },
  },
  components: {
    Star,
  },
  computed: {
    setBtnTitle(): string {
      return this.InWishlist ? this.btnTitle[1] : this.btnTitle[0];
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