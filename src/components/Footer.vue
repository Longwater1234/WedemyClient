<template>
  <footer class="footer">
    <div class="lefty">
      <el-row>Photo Credits</el-row>
      <el-row>About Us</el-row>
      <el-row>(Github Links)</el-row>
    </div>
    <div class="righty">
      <el-row>&copy; 2021, Wedemy</el-row>
      <el-row
        ><img src="@/assets/final_white.png" alt="logo" id="ft-logo"
      /></el-row>
    </div>
    <!-- TODO: ADD PAYMENT METHODS HERE -->
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  data() {
    return {
      key: "value",
    };
  },
  methods: {
    name() {},
  },
});
</script>

<style>
.footer {
  text-align: center;
  position: relative;
  display: flex;
  padding: 1em;
  margin: auto;
  justify-content: space-around;
  width: 98%;
  overflow: hidden;
  height: 5em;
  bottom: 0;
  margin-bottom: 0;
  color: white;
  background-color: black;
}

.lefty {
  float: left;
}

.lefty el-row {
  margin-bottom: 20px;
}

.righty {
  float: right;
}

#ft-logo {
  width: 10em;
  margin-top: 1em;
  height: 100%;
}
</style>