<template>
  <footer class="footer">
    <div class="lefty">
      <el-row>Photo Credits</el-row>
      <el-row>About Us</el-row>
    </div>
    <div class="righty">&copy; 2021, Wedemy</div>
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
  position: fixed;
  display: flex;
  padding: 1em;
  justify-content: space-around;
  width: 100%;
  height: max-content;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  background-color: black;
}

.lefty {
  float: left;
}

.righty {
  float: right;
}

.logoFooter {
  width: 100%;
  height: 70%;
}
</style>