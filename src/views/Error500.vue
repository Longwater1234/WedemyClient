<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <div class="widescreen">
    <h1 style="margin-top: 50px">ಥ_ಥ</h1>
    <div class="error-num">500</div>
    <div>Oops! Something broke in our server...😢</div>
    <br />

    <!-- BUTTON STARTS HERE -->
    <div class="shortbaby">
      <router-link to="/" replace>
        <el-button class="btn purple">Go Home</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    document.title = "500 Internal Server Error | Wedemy";
    return {};
  }
});
</script>

<style scoped>
.widescreen {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 50%;
  height: 70vh;
  color: black;
}

.error-num {
  margin-top: 50px;
  font-size: 10rem;
}

.shortbaby {
  margin: 0 auto;
  width: 10em;
}
</style>
