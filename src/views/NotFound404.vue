<template>
  <div class="widescreen">
    <h1 style="margin-top: 50px">¯\_(ツ)_/¯</h1>
    <h1 style="margin-top: 50px">Error 404</h1>
    <h2>Hmm, You seem to be lost.</h2>
    <br/>
    <router-link to="/" replace>
      <el-button type="success">Go Home</el-button>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "NotFound",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.widescreen {
  margin: 0 auto;
  text-align: center;
  width: 90%;
  height: 70vh;
  color: black;
}
</style>