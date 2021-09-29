<template >
  <div class="wrapper main-view" style="margin-top: 24px">
    <h2 class="most-pop">${category}</h2>

    <!-- <el-skeleton animated :loading="loading" style="margin-top: 15px"> -->
    <el-space
      direction="vertical"
      alignment="start"
      :size="30"
      style="margin-top: 20px; margin-left: 20px"
    >
      <el-space wrap :size="size">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="hover"
          style="margin-bottom: 13px"
          v-for="o in 12"
          :key="o"
          class="card"
        >
          <img src="../images/1613872731202.webp" class="product-img" />
          <div style="padding: 14px">
            <span class="card-title">Course name</span>
            <div class="card-author"><span>Course author</span></div>
            <!-- rating from users -->
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            >
            </el-rate>
            <div>$19.99</div>
          </div>
        </el-card>
      </el-space>
    </el-space>
    <!-- </el-skeleton> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    document.title = "${category} | Wedemy";
    return {
      size: "large",
      value: 4.7,
      // api: [],
      // work: [],
      // loading: true,
    };
  },

  // mounted() {
  //   axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
  //     this.api = res.data;
  //     this.work = res.data[0];
  //     setTimeout(() => {
  //       this.loading = false;
  //     }, 2000);
  //     console.log(res.data);
  //     console.log(res.data[0]);
  //   });
  // },
};
</script>

<style >
.most-pop {
  border-bottom: 1px solid darkkhaki;
}
</style>