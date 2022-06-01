<template>
  <div class="widescreen">
    <h1 style="margin-top: 50px">¯\_(ツ)_/¯</h1>
    <h1 style="margin-top: 50px">Error 404</h1>
    <h2>Hmm, You seem to be lost...</h2>
    <br/>

    <!-- BUTTON STARTS HERE -->
    <div class="shortbaby">
    <router-link to="/" replace>
      <el-button class="btn purple">Go Home</el-button>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    document.title = "404 Error | Wedemy"
    return {
      myInput: "Hello world"
    };
  },
  methods: {},
};
</script>

<style>
.widescreen {
  margin: 0 auto;
  text-align: center;
  width: 50%;
  height: 70vh;
  color: black;
}

.shortbaby{
  margin: 0 auto;
  width: 10em;
}

</style>