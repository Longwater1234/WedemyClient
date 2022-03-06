<template>
  <div class="widescreen">
    <h1 style="margin-top: 50px">¯\_(ツ)_/¯</h1>
    <h1 style="margin-top: 50px">Error 500</h1>
    <h2>Oops, Something broke on our Server...</h2>
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
  data() {
    document.title = "404 Error | Wedemy";
    return {
      key: "value",
    };
  },
  mounted() {
    //do someting
  },
});
</script>

<style>
.widescreen {
  margin: 0 auto;
  text-align: center;
  width: 50%;
  height: 70vh;
  color: black;
}

.shortbaby {
  margin: 0 auto;
  width: 10em;
}
</style>