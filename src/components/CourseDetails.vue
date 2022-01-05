<template>
  <el-affix :offset="10" class="fixed-baby">
    <el-card :shadow="false" class="details-card">
      <div>
        <img
          :src="singleCourse.thumbUrl"
          class="small-img"
          :alt="singleCourse.title"
        />
      </div>
      <h1>${{ singleCourse.price }}</h1>
      <div class="btn-block">
        <el-button :loading="isLoading" class="btn purple">
          Add to Cart
        </el-button>
        <!-- TO-DO MAKE A HEART BUTTON BESIDE ADD_TO_CART -->
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

export default defineComponent({
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    singleCourse: {
      type: Object,
      default: {},
    },
  },
  methods: {
    name() {},
  },
  mounted() {},
  components: {
    Star,
  },
});
</script>

<style>
.fixed-baby {
  width: 40%;
  float: right;
  top: 0;
}

.details-card {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.small-img {
  height: 200px;
  aspect-ratio: 16/9;
  margin: auto;
}

.btn-block {
  display: flex;
  flex-direction: column;
}
</style>