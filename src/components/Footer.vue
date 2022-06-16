<template>
  <footer class="footer">
    <div class="lefty">
      <el-row class="footer-row">Photo Credits</el-row>
      <el-row class="footer-row">About Us</el-row>
      <el-row class="footer-row">(Github Links)</el-row>
    </div>
    <div class="righty">
      <el-row>&copy; 2021, Wedemy</el-row>
      <el-row>
        <img src="@/assets/final_white.png" alt="logo" id="ft-logo" />
      </el-row>
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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  bottom: 0;
  padding: 1em;
  height: 5em;
  color: white;
  background-color: var(--dark);
}

.lefty {
  float: left;
}

.lefty .footer-row {
  margin-bottom: 5px;
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